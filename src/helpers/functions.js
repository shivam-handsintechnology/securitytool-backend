const { default: axios } = require("axios");

async function useCustomFetch(url, options = {}) {
    try {
        const response = await axios.get(url, options);
        return { data: response.data, status: response.status };
    } catch (error) {
        console.log(JSON.stringify(error.message));
        return { error };
    }
}
const errorHandler = (
    res,
    statusCode = 500,
    message = "internal server error",
    data
) => {
    const response = { statusCode, message, data };
    res.status(statusCode).json(response);
};
function consoleColorText(text, color) {
    const colors = {
        reset: "\x1b[0m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    };

    const colorCode = colors[color] || colors.reset;
    console.log(colorCode + text + colors.reset);
}
// End Create Blacklistusers details function
// Sql Injection Function
function hasSqlInjection(value) {
    const sqlMeta = new RegExp(
        "(%27)|(--)|([0-9]=[0-9])|([0-9] and [0-9]=[0-9])|([0-9] AND [0-9])|(or [0-9]=[0-9])|(OR [0-9]=[0-9])|(%23)|(#)",
        "i"
    );
    if (sqlMeta.test(value)) {
        return true;
    }

    const sqlMeta2 = new RegExp(
        "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))",
        "i"
    );
    if (sqlMeta2.test(value)) {
        return true;
    }

    const nestedQuery = new RegExp(
        "((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))?[^\n]*((%27)|(')|(--)|(%3B)|(;))[^\n]*((%3D)|(=))",
        "i"
    );
    if (nestedQuery.test(value)) {
        return true;
    }

    const timeBased = new RegExp("(%3B)|(;)[^\n]*sleep((d+))[^\n]*", "i");
    if (timeBased.test(value)) {
        return true;
    }

    const booleanBased = new RegExp(
        "((%3D)|(=))[^\n]*[^s]*(%27)|(')|(--)|(%3B)|(;)",
        "i"
    );
    if (booleanBased.test(value)) {
        return true;
    }

    const typicalSql = new RegExp(
        "w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))",
        "i"
    );
    if (typicalSql.test(value)) {
        return true;
    }

    const sqlUnion = new RegExp("((%27)|('))union", "i");
    if (sqlUnion.test(value)) {
        return true;
    }

    const entireText = new RegExp(
        "\b((select|delete|insert|update|drop|create|alter)\b.*)",
        "i"
    );
    if (entireText.test(value)) {
        return true;
    }

    return false;
}
// Co0mmandline Injection Function
function hasCommandLineInjection(value) {
    const commandMeta = new RegExp(
        "(rm -rf)|(ls -la)|(command >/dev/sda)|(:\\(\\){ :|:& };:)|(sudo yum install)|(.conf)|(sudo mv  /dev/null)|(wget)|(-O-)|(crontab -r)|(history)|(dd if=/dev/zero of=/dev/sda)|(/dev/sda)|(/dev/sda1)|(sudo apt purge python|python2|python3.x-minimal)|(chmod -R 777 /)",
        "i"
    );
    if (commandMeta.test(value)) {
        return true;
    }

    return false;
}
// HTML Injection Function
function hasHTMLnjection(value) {
    const HTML = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/, "g");
    if (HTML.test(value)) {
        return true;
    }
    return false;
}
// HTML Injection Function
function hasXSSnjection(value) {
    const XSS = /<script>/;
    if (XSS.test(value)) {
        return true;
    }
    return false;
}
async function InjectionChecker(req) {
    const entries = {
        ...req.body,
        ...req.query,
        ...req.params,
    };
    let containsSql = false,
        validateXss = false,
        validatehtml = false,
        containCommand = false;
    const value = JSON.stringify(entries);
    if (hasSqlInjection(value) === true) {
        containsSql = true;
    }
    if (hasXSSnjection(value) === true) {
        validateXss = true;
    }
    if (hasHTMLnjection(value) === true) {
        validatehtml = true;
    }
    if (hasCommandLineInjection(value) === true) {
        containCommand = true;
    }
    return { containsSql, validateXss, validatehtml, containCommand };
}
module.exports = {
    useCustomFetch,
    errorHandler, consoleColorText, InjectionChecker
};