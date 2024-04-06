const endpoints =[
    {
        "path": "/protected",
        "methods": [
            "GET",
            "POST"
        ],
        "middlewares": [
            "JsSnippet"
        ]
    },
    {
        "path": "/api/security/sqllogs/",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "getAllSqllLogs"
        ]
    },
    {
        "path": "/api/security/sqllogs/single",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "getSingleSqllLogs"
        ]
    },
    {
        "path": "/api/security/sqllogs/deleteall",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "deleteAllSqllLogs"
        ]
    },
    {
        "path": "/api/security/sqllogs/deletesingle",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "deleteSingleSqllLogs"
        ]
    },
    {
        "path": "/api/security/sqllogs/count",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "getSingleSqllLogsCount"
        ]
    },
    {
        "path": "/api/security/middlwares",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "getMiddlewareController"
        ]
    },
    {
        "path": "/api/security/middlwares/switch",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "findAndUpdateMiddlewareController"
        ]
    },
    {
        "path": "/api/security",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/ssl",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/ip",
        "methods": [
            "POST",
            "GET",
            "DELETE"
        ],
        "middlewares": [
            "addIP",
            "getAllIPs",
            "deleteIP"
        ]
    },
    {
        "path": "/api/security/blacklist",
        "methods": [
            "POST",
            "GET",
            "DELETE"
        ],
        "middlewares": [
            "AddBlackListIp",
            "BlackList",
            "DeleteBlackListip"
        ]
    },
    {
        "path": "/api/security/domain",
        "methods": [
            "POST",
            "GET",
            "DELETE",
            "PUT"
        ],
        "middlewares": [
            "addDomain",
            "getAllDomains",
            "deleteDomain",
            "updateDomain"
        ]
    },
    {
        "path": "/api/security/whitelistwords",
        "methods": [
            "POST",
            "GET",
            "DELETE"
        ],
        "middlewares": [
            "addWord",
            "getAllWords",
            "deleteWord"
        ]
    },
    {
        "path": "/api/security/whitelistwords/add-multiple-words",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "addMUltipleWords"
        ]
    },
    {
        "path": "/api/security/test",
        "methods": [
            "POST",
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/test/EmailHarvestingsData",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/test/sensitiveinfoinurl",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/test/sensitiveinfoinbody",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/test/defaultwebpage",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/test/robottxt",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "anonymous",
            "getRobotsTxt"
        ]
    },
    {
        "path": "/api/security/test/PasswordValidatorController",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "PasswordValidatorController"
        ]
    },
    {
        "path": "/api/security/test/responsecodes",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "ServerErrorResponseCodesController"
        ]
    },
    {
        "path": "/api/security/test/reponsecodeslogin",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "ResponseCodesLoginController"
        ]
    },
    {
        "path": "/api/security/test/session-data",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "sessionData"
        ]
    },
    {
        "path": "/api/security/insecure_direct_object_references/directory_listing_is_enabled_on_the_server",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/security/insecure_direct_object_references/path_traveling",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/api/client/httpparameterpollution",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "httpparameterpollution"
        ]
    },
    {
        "path": "/api/client/sslverify",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "sslverify"
        ]
    },
    {
        "path": "/api/client/plaincredential",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "plaincredential"
        ]
    },
    {
        "path": "/api/client/alloweddomains",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "alloweddomains"
        ]
    },
    {
        "path": "/api/client/createuserdetails",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "createuserdetails"
        ]
    },
    {
        "path": "/api/client/responsecodeavailableornot",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "responsecodeavailableornot"
        ]
    },
    {
        "path": "/api/client/emailverify",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "emailverify"
        ]
    },
    {
        "path": "/api/client/passwordkeys",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "passwordkeys"
        ]
    },
    {
        "path": "/api/client/sensitivekeysandPasswordValidate",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "sensitivekeysandPasswordValidate"
        ]
    },
    {
        "path": "/api/client/sensitivekeysinurl",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "sensitivekeysinurl"
        ]
    },
    {
        "path": "/api/client/logsdata",
        "methods": [
            "POST",
            "GET"
        ],
        "middlewares": [
            "addlogsdata"
        ]
    },
    {
        "path": "/api/client/sessionstoragedata",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "sessionstoragedata"
        ]
    },
    {
        "path": "/api/client/directory_listing_is_enabled_on_the_server",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "directory_listing_is_enabled_on_the_server"
        ]
    },
    {
        "path": "/api/client/accesscontrollalloworigin",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "accesscontrollalloworigin"
        ]
    },
    {
        "path": "/api/client/securityheaders",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "securityheaders"
        ]
    },
    {
        "path": "/api/client/nodeversion",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "nodeversion"
        ]
    },
    {
        "path": "/api/client/scanpackagejson",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "scanpackagejson"
        ]
    },
    {
        "path": "/api/client/middlewares",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "getMiddlewareControllerForClient"
        ]
    },
    {
        "path": "/api/auth/register",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "Register"
        ]
    },
    {
        "path": "/api/auth/login",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "Login"
        ]
    },
    {
        "path": "/api/auth/Oauth",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "GoogleRegister"
        ]
    },
    {
        "path": "/api/auth/profile",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "Profile"
        ]
    },
    {
        "path": "/api/auth/facebook",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "FBCustomerLogin"
        ]
    },
    {
        "path": "/api/auth/logout",
        "methods": [
            "POST"
        ],
        "middlewares": [
            "Logout"
        ]
    },
    {
        "path": "/api/SecurityMisconfiguration/arbitrary-methods",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "arbitraryMethods"
        ]
    },
    {
        "path": "/api/SecurityMisconfiguration/passwords-insecure",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "passwordsInsecure"
        ]
    },
    {
        "path": "/api/SecurityMisconfiguration/support-oldnodejs-version",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "supportoldnodejsversion"
        ]
    },
    {
        "path": "/api/SecurityMisconfiguration/dangerous-http-methods-enabled",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "verifyToken",
            "DangerousHttpMethodsEnabled"
        ]
    },
    {
        "path": "/sitescanner",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "anonymous"
        ]
    },
    {
        "path": "/GetAutitReport",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "GetAutitReport"
        ]
    },
    {
        "path": "/DirectoryListingEnable",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "DirectoryListingEnable"
        ]
    },
    {
        "path": "/getEndpoints",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "getEndpoints"
        ]
    },
    {
        "path": "/passwords-insecure",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "passwordsInsecure"
        ]
    },
    {
        "path": "/support-oldnodejs=version",
        "methods": [
            "GET"
        ],
        "middlewares": [
            "supportOldNodejsVersion"
        ]
    }
]

function checkForDangerousMethods(endpoints) {
    let dangerousEndpoints = [];

    endpoints.forEach(endpoint => {
        endpoint.methods.forEach(method => {
            if (method === "DELETE" || method === "PUT" || method === "PATCH") {
                dangerousEndpoints.push(endpoint.path);
            }
        });
    });

    return dangerousEndpoints;
}

const dangerousEndpoints = checkForDangerousMethods(endpoints);

if (dangerousEndpoints.length > 0) {
    console.log("The following endpoints use dangerous methods:");
    dangerousEndpoints.forEach(endpoint => {
        console.log(endpoint);
    });
} else {
    console.log("No endpoints use dangerous methods.");
}
function findEndpointsWithArbitraryMethods(endpoints) {
    let endpointsWithArbitraryMethods = {};

    endpoints.forEach(endpoint => {
        endpoint.methods.forEach(method => {
            if (!isStandardMethod(method)) {
                if (!endpointsWithArbitraryMethods[endpoint.path]) {
                    endpointsWithArbitraryMethods[endpoint.path] = 1;
                } else {
                    endpointsWithArbitraryMethods[endpoint.path]++;
                }
            }
        });
    });

    return endpointsWithArbitraryMethods;
}

function isStandardMethod(method) {
    const standardMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "TRACE"];
    return standardMethods.includes(method.toUpperCase());
}

const endpointsWithArbitraryMethods = findEndpointsWithArbitraryMethods(endpoints);

const labels = Object.keys(endpointsWithArbitraryMethods);
const data = Object.values(endpointsWithArbitraryMethods);
console.log("labels",labels)
console.log("data",data)





