const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");
const { consoleColorText } = require("./functions");
// const baseUrl="https://securitytool.handsintechnology.in/api/client"
const baseUrl = "http://localhost:20000/api/client";

// getAllEndpoints
const regExpToParseExpressPathRegExp =
    /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/;
const regExpToReplaceExpressPathRegExpParams = /\(\?:\(\[\^\\\/]\+\?\)\)/;
const regexpExpressParamRegexp = /\(\?:\(\[\^\\\/]\+\?\)\)/g;

const EXPRESS_ROOT_PATH_REGEXP_VALUE = "/^\\/?(?=\\/|$)/i";
const STACK_ITEM_VALID_NAMES = ["router", "bound dispatch", "mounted_app"];
/**
 * Returns all the verbs detected for the passed route
 */
const getRouteMethods = function (route) {
    let methods = Object.keys(route.methods);
    methods = methods.filter((method) => method !== "_all");
    methods = methods.map((method) => method.toUpperCase());
    return methods;
};
/**
 * Returns the names (or anonymous) of all the middlewares attached to the
 * passed route
 * @param {Object} route
 * @returns {string[]}
 */
const getRouteMiddlewares = function (route) {
    return route.stack.map((item) => {
        return item.handle.name || "anonymous";
    });
};

/**
 * Returns true if found regexp related with express params
 * @param {string} expressPathRegExp
 * @returns {boolean}
 */
const hasParams = function (expressPathRegExp) {
    return regexpExpressParamRegexp.test(expressPathRegExp);
};

/**
 * @param {Object} route Express route object to be parsed
 * @param {string} basePath The basePath the route is on
 * @return {Object[]} Endpoints info
 */
const parseExpressRoute = function (route, basePath) {
    const paths = [];

    if (Array.isArray(route.path)) {
        paths.push(...route.path);
    } else {
        paths.push(route.path);
    }

    const endpoints = paths.map((path) => {
        const completePath =
            basePath && path === "/" ? basePath : `${basePath}${path}`;

        const endpoint = {
            path: completePath,
            methods: getRouteMethods(route),
            middlewares: getRouteMiddlewares(route),
        };

        return endpoint;
    });

    return endpoints;
};

/**
 * @param {RegExp} expressPathRegExp
 * @param {Object[]} params
 * @returns {string}
 */
const parseExpressPath = function (expressPathRegExp, params) {
    let expressPathRegExpExec =
        regExpToParseExpressPathRegExp.exec(expressPathRegExp);
    let parsedRegExp = expressPathRegExp.toString();
    let paramIndex = 0;

    while (hasParams(parsedRegExp)) {
        const paramName = params[paramIndex].name;
        const paramId = `:${paramName}`;

        parsedRegExp = parsedRegExp.replace(
            regExpToReplaceExpressPathRegExpParams,
            paramId
        );

        paramIndex++;
    }

    if (parsedRegExp !== expressPathRegExp.toString()) {
        expressPathRegExpExec = regExpToParseExpressPathRegExp.exec(parsedRegExp);
    }

    const parsedPath = expressPathRegExpExec[1].replace(/\\\//g, "/");

    return parsedPath;
};

/**
 * @param {Object} app
 * @param {string} [basePath]
 * @param {Object[]} [endpoints]
 * @returns {Object[]}
 */
const parseEndpoints = function (app, basePath, endpoints) {
    const stack = app.stack || (app._router && app._router.stack);

    endpoints = endpoints || [];
    basePath = basePath || "";

    if (!stack) {
        endpoints = addEndpoints(endpoints, [
            {
                path: basePath,
                methods: [],
                middlewares: [],
            },
        ]);
    } else {
        endpoints = parseStack(stack, basePath, endpoints);
    }
    return endpoints;
};

/**
 * Ensures the path of the new endpoints isn't yet in the array.
 * If the path is already in the array merges the endpoints with the existing
 * one, if not, it adds them to the array.
 *
 * @param {Object[]} currentEndpoints Array of current endpoints
 * @param {Object[]} endpointsToAdd New endpoints to be added to the array
 * @returns {Object[]} Updated endpoints array
 */
const addEndpoints = function (currentEndpoints, endpointsToAdd) {
    endpointsToAdd.forEach((newEndpoint) => {
        const existingEndpoint = currentEndpoints.find(
            (item) => item.path === newEndpoint.path
        );

        if (existingEndpoint !== undefined) {
            const newMethods = newEndpoint.methods.filter(
                (method) => !existingEndpoint.methods.includes(method)
            );

            existingEndpoint.methods = existingEndpoint.methods.concat(newMethods);
        } else {
            currentEndpoints.push(newEndpoint);
        }
    });

    return currentEndpoints;
};

/**
 * @param {Object} stack
 * @param {string} basePath
 * @param {Object[]} endpoints
 * @returns {Object[]}
 */
const parseStack = function (stack, basePath, endpoints) {
    stack.forEach((stackItem) => {
        if (stackItem.route) {
            const newEndpoints = parseExpressRoute(stackItem.route, basePath);

            endpoints = addEndpoints(endpoints, newEndpoints);
        } else if (STACK_ITEM_VALID_NAMES.includes(stackItem.name)) {
            const isExpressPathRegexp = regExpToParseExpressPathRegExp.test(
                stackItem.regexp
            );

            let newBasePath = basePath;

            if (isExpressPathRegexp) {
                const parsedPath = parseExpressPath(stackItem.regexp, stackItem.keys);

                newBasePath += `/${parsedPath}`;
            } else if (
                !stackItem.path &&
                stackItem.regexp &&
                stackItem.regexp.toString() !== EXPRESS_ROOT_PATH_REGEXP_VALUE
            ) {
                const regExpPath = ` RegExp(${stackItem.regexp}) `;

                newBasePath += `/${regExpPath}`;
            }

            endpoints = parseEndpoints(stackItem.handle, newBasePath, endpoints);
        }
    });

    return endpoints;
};

/**
 * Returns an array of strings with all the detected endpoints
 * @param {Object} app the express/route instance to get the endpoints from
 */
const getEndpoints = function (app) {
    const endpoints = parseEndpoints(app);
    return endpoints;
};
const sendFilesToServer = async (
    directoryPath,
    serverUrl,
    sid,
    middlewares,
    appid
) => {
    try {
        const results = [];
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            if (file === __filename) {
                continue;
            } else {
                const filePath = `${directoryPath}/${file}`;
                const stat = fs.statSync(filePath);
                if (file === "package.json") {
                    const fileContent = fs.readFileSync(filePath, "utf8");
                    await axios
                        .post(`${serverUrl}/scanpackagejson`, { fileContent, sid, appid })
                        .then((res) => res.data)
                        .catch((err) => err.response.data);
                }
                if (stat.isDirectory()) {
                    if (file === "node_modules" || file === "build") {
                        continue;
                    }
                    const subresults = await sendFilesToServer(
                        filePath,
                        serverUrl,
                        sid,
                        middlewares
                    );
                    results.push(...subresults);
                } else {
                    if (path.extname(file) === ".js") {
                        const fileContent = fs.readFileSync(filePath, "utf8");
                        try {
                            const api1 = await axios.post(`${serverUrl}/scanhardcodedata`, {
                                fileName: file,
                                content: fileContent,
                                sid,
                                appid,
                            });
                            const api2 = await axios.post(
                                `${serverUrl}/scanpasswordhashing`,
                                { fileName: file, content: fileContent, sid, appid }
                            );
                            const api3 = await axios.post(`${serverUrl}/xssvulnerability`, {
                                fileName: file,
                                content: fileContent,
                                sid,
                                appid,
                            });
                            const api4 = await axios.post(
                                `${serverUrl}/redirectvulnerability`,
                                { fileName: file, content: fileContent, sid, appid }
                            );
                            const api5 = await axios.post(
                                `${serverUrl}/sessionvulnerability`,
                                {
                                    fileName: file,
                                    content: fileContent,
                                    sid,
                                    middlewares,
                                    appid,
                                }
                            );
                            const api6 = await axios.post(`${serverUrl}/sqlvulnerability`, {
                                fileName: file,
                                content: fileContent,
                                sid,
                                appid,
                            });
                            const responses = await axios.all([
                                api1,
                                api2,
                                api3,
                                api4,
                                api5,
                                api6,
                            ]);
                            responses.forEach((response, index) => {
                                results.push(response.data);
                            });
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                }
            }
        }

        return results;
    } catch (error) {
        console.log(error.message);
        return [];
    }
};
async function HttpParameterpollutionchecker(req, res) {
    try {

        console.log("Please wait ");
        const app = req.app,
            hostname = req.domain,
            appid = req.appid;
        const routes = getEndpoints(app);
        const middlewares =
            app._router?.stack
                ?.filter(
                    (layer) =>
                        layer.name !== "router" &&
                        layer.name !== "bound dispatch" &&
                        layer.name !== "jsonParser" &&
                        layer.name !== "<anonymous>" &&
                        layer.name !== "urlencodedParser" &&
                        layer.name !== "expressInit" &&
                        layer.name !== "query" &&
                        layer.name !== "Middleware"
                )
                ?.map((layer) => layer.name) || [];

        const api1 = axios.post(`${baseUrl}/optionmethodvulnerability`, {
            routes,
            hostname,
            middlewares,
            appid: req.appid,
        });
        const api2 = axios.post(`${baseUrl}/dangerousemethodvulnerability`, {
            routes,
            hostname,
            middlewares,
            appid: req.appid,
        });
        const data = {
            hostname,
            params: req.query || req.params,
            nodejsveresion: process.version,
            appid: req.appid,
        }
        const api4 = axios.post(`${baseUrl}/nodeconfiguration`, data);
        const [response1, response2, response4] = await axios.all([
            api1,
            api2,
            api4,
        ]);
        const first = [response1.data, response2.data, response4.data];
        const Second = await sendFilesToServer(
            process.cwd(),
            baseUrl,
            req.domain,
            middlewares,
            req.appid
        );
        var Logs = first.concat(Second);

        // Logs.push({ middlewares: middlewares.toString() });
        console.log("alllogs", Logs)
        const alllogs = Logs.filter((v) => v !== "");
        //
        const logsdatastatus = await axios
            .post(`${baseUrl}/logsdata`, { logs: alllogs, appid, sid: hostname })
            .then((res) => res.status)
            .catch((err) => err?.response?.status)
        if (logsdatastatus === 200) {
            const logsdata = await axios
                .get(`${baseUrl}/logsdata?appid=${appid}&sid=${hostname}`)
                .then((res) => {
                    return { status: res.status, data: res.data };
                })
                .catch((err) => {
                    return { status: err?.response?.status, data: err?.response?.data };
                });

            if (logsdata.status === 200) {
                console.log("logsdata", logsdata.data);
                if (
                    logsdata.data.passwordHashing ===
                    "password text not store in hash format"
                ) {
                    consoleColorText(logsdata.data.passwordHashing, "red");
                } else {
                    consoleColorText(logsdata.data.passwordHashing, "blue");
                }
                consoleColorText(logsdata?.data?.xss?.replace(/,/g, "\n"), "red");
                consoleColorText(logsdata?.data?.sql?.replace(/,/g, "\n"), "red");
                consoleColorText(logsdata?.data?.session?.replace(/,/g, "\n"), "red");
                if (
                    logsdata?.data?.redirect == "Redirect  vunurbilities  not  found  "
                ) {
                    consoleColorText(logsdata?.data?.redirect, "blue");
                } else {
                    consoleColorText(
                        logsdata?.data?.redirect?.replace(/,/g, "\n"),
                        "red"
                    );
                }
                if (logsdata?.data?.dwp == "Available") {
                    consoleColorText(
                        "Default Web Page:" + logsdata?.data?.dwp?.replace(/,/g, "\n"),
                        "blue"
                    );
                } else {
                    consoleColorText(
                        "Default Web Page:" + logsdata?.data?.dwp?.replace(/,/g, "\n"),
                        "red"
                    );
                }

                if (logsdata?.data?.OptionMethod == "Option Method is not enable") {
                    consoleColorText(
                        logsdata?.data?.OptionMethod?.replace(/,/g, "\n"),
                        "blue"
                    );
                } else {
                    consoleColorText(
                        "Option Method  enabled on :" +
                        logsdata?.data?.OptionMethod.replace(/,/g, "\n"),
                        "red"
                    );
                }

                if (
                    logsdata?.data?.DangerousMethods ==
                    "Dangerous Methods are  not enable"
                ) {
                    consoleColorText("Dangerous Methods are  not enable", "blue");
                } else {
                    consoleColorText(
                        "Dangerous methods enabled:" +
                        logsdata?.data?.DangerousMethods.replace(/,/g, "\n"),
                        "red"
                    );
                }
                return res.status(200).json(logsdata.data);
            } else {
                return res.status(404).json("not found");
            }
        }
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}
module.exports = {
    HttpParameterpollutionchecker, consoleColorText, getEndpoints, sendFilesToServer, parseExpressPath, parseExpressRoute, parseStack, addEndpoints, getRouteMethods, getRouteMiddlewares, hasParams, parseEndpoints, regExpToParseExpressPathRegExp, regExpToReplaceExpressPathRegExpParams, regexpExpressParamRegexp, EXPRESS_ROOT_PATH_REGEXP_VALUE, STACK_ITEM_VALID_NAMES
    , getEndpoints,
};