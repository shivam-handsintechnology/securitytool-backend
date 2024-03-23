
const axios = require("axios")
const fs = require("fs");
const { consoleColorText, scanDirectory } = require("./helpers/httpparameterpollution");
const { getEndpoints } = require("./helpers/getEndpoint");
const { baseUrl } = require("./config");

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
const HostValidator = async (app, hostname, appid) => {
  try {
    let audit = await GetAutitReport()

    const application = getEndpoints(app)
    // const params = req.body.params
    const nodejsveresion = process.version;
    const directoryPath = process.cwd();
    // Call the function to scan the directory
    const jsonData = await scanDirectory(directoryPath);
    // Convert the result to JSON
    const fileContent = jsonData

    await axios.post(baseUrl + "/alloweddomains", {
      hostname,
      type:"api",
      appid,
      application: application, nodejsveresion,
      fileContent: fileContent,
      auditReport: audit.success ? audit.auditReport : null

    },).then((res) => {
      console.log(res.data)
      if (res.data.domain.includes(hostname)) {
        consoleColorText("Domain is allowed", "green");

      } else {
        consoleColorText("Domain is not allowed", "red");
      }



    }).catch((error) => {
      console.log(error)
      consoleColorText("Domain is not allowed", "red");
    })

  } catch (error) {
    if (error) {
      console.log({ error })
      return { allowed: false };
    }
  }

};

module.exports =
  (app, sid, appid) => {
    try {

      app.get("/sitescanner", (req, res) => {
        res.json(req.query)
      });
      HostValidator(app, sid, appid)
    }
    catch (error) {
      console.log(error);
      consoleColorText(error.message, "red");
    }
  };

