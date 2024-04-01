const { default: axios } = require("axios");
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
// Create Blacklistusers details function
const CreateuserDetails = async (req, res, message, type) => {
    res.on("finish", async () => {
        try {
            message = "malacios";
            // var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            var ip = req.ip
            console.log("ip ", ip)
            // var ip = "206.84.234.39";
            const month = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const d = new Date();

            const useragent = req.headers["user-agent"];
            // // const result = detector.detect(useragent);
            // // const { client, os, device } = result

            const UserRawData = {
                ip,
                date: d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear(),
                time: d.toLocaleTimeString(),
                page: req.url,
                query: req.query || req.query || "",
                inputQuery: req.body || "",
                type,
                // country: country || "",
                // city: city || "",
                // region: region || "",
                useragent,
                latitude: "",
                longitude: "",
                domain: req.get("host"),
                referurl:
                    req.protocol + "://" + req.get("host") + req.originalUrl || "",
            };
            await axios
                .post(`${baseUrl}/createuserdetails`, {
                    type,
                    hostname: req.domain,
                    appid: req.appid,
                    ip,
                    UserRawData,
                })
                .then((res) => res.data)
                .catch((err) => err?.response?.data);
        } catch (error) {
            // console.log("eror in malacius data create ", error);
        }
    });
};
const { spawn } = require("child_process");
const CreatePackageLockFile = () => {
  return new Promise((resolve, reject) => {
    const lockfile = spawn("npm", ["install", "--package-lock"], { shell: true });
    lockfile.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    }
    );
    lockfile.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    }
    );
    lockfile.on("exit", (code) => {
      if (code === 0) {
        resolve("success")
      } else {
        reject("error")
      }
      console.log(`child process exited with code ${code}`);
    }
    );
    lockfile.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    }
    );
  });
}
// after create lock run npm audit
const npmAudit = () => {
  return new Promise((resolve, reject) => {
    // npm audit via spawn

    const npm = spawn("npm", ["audit", "--json"], { shell: true });

    let auditReport = ''; // To collect audit report data

    npm.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      auditReport += data.toString(); // Collect data
    });

    npm.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      // reject(data.toString())
    });

    npm.on("exit", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(auditReport)
    });

    npm.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      // Do something with the audit report data here as well, if needed
    });
  }
  );
}
const GetAutitReport = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await CreatePackageLockFile()
      const auditReport = await npmAudit()
      resolve({ auditReport, success: true })
    } catch (error) {
      console.log("error", error)
      reject({ success: false })
    }
  })
}
async function getDirectoryUrls(directory) {
    try {
        let directoryUrls = [];

        // Read the contents of the directory asynchronously
        const files = await fs.promises.readdir(directory);

        // Iterate through each file/directory
        for (const file of files) {
            const filePath = path.join(directory, file);
            // Check if it's a directory
            const fileStats = await fs.promises.stat(filePath);
            if (fileStats.isDirectory()) {
                // Skip 'node_modules' and '.git' directories
                if (file !== 'node_modules' && file !== '.git') {
                    // Add the URL of the directory
                    const url = filePath.replace(__dirname, '').replace(/\\/g, '/');
                    directoryUrls.push(url);
                    // Recursively get URLs of directories within this directory
                    const subDirectoryUrls = await getDirectoryUrls(filePath);
                    directoryUrls = directoryUrls.concat(subDirectoryUrls);
                }
            }
        }

        return directoryUrls;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

module.exports = {
    errorHandler, consoleColorText, InjectionChecker, CreateuserDetails, hasSqlInjection,GetAutitReport,getDirectoryUrls
};