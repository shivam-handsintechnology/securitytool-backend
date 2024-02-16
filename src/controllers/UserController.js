const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const crypto = require('crypto');
const { checkDomainAvailability, validatePassword } = require("../utilities/functions/functions");
var CryptoJS = require("crypto-js");
const { middlewareModel } = require("../models/midlwaresModel");
const { v4: uuidv4 } = require('uuid');
const { ValidateUserSignUp, ValidateUserLogin } = require("../../helpers/Validators");
const key = "12345678911012121234567891101212"
const searchFilesRemotely = async (remotePath, searchTerm, ssh) => {
  try {
    const response = await ssh.execCommand(`find ${remotePath} -type f -exec grep -l "${searchTerm}" {} +`);
    const files = response.stdout.split('\n').filter(Boolean);
    const searchResults = searchInFiles(ssh, files, searchTerm);
    const directories = files.filter(file => file.endsWith('/'));
    for (const directory of directories) {
      const subdirectory = directory.slice(remotePath.length);
      await searchFilesRemotely(config, `${remotePath}${subdirectory}`, searchTerm);
    }
    return searchResults

  } catch (error) {
    return error
  }
};
const searchInFiles = async (ssh, files, searchTerm) => {
  const searchResults = [];

  for (const file of files) {
    try {
      const response = await ssh.execCommand(`grep -rnw "${file}" -e "${searchTerm}" --exclude-dir="/node_modules" --exclude-dir="./nvm"  --exclude-dir="/nvm"  --exclude-dir="./node_modules"`);

      if (response.stdout) {
        if (!file.includes('node_modules')) {
          const lines = response.stdout.split('\n');
          lines.forEach(async (line, index) => {
            const match = line.match(/(var|const|let)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*express\(/);
            if (match) {
              const variableName = match[2];
              const nextLine = lines[index + 1];
              const filePath = file.replace(/"/g, '\\"');
              const modifiedContent = `${line}\nconsole.log("je")`;

              if (filePath && nextLine) {
                const escapedFilePath = filePath.replace(/"/g, '\\"');
                const escapedContent = modifiedContent.replace(/"/g, '\\"').replace(/\$/g, '\\$');
                const insertLineCommand = `sed -i "/${line.replace(/"/g, '\\"')}/{n;a ${escapedContent}" "${escapedFilePath}"`;
                await ssh.execCommand(insertLineCommand);
              }
              searchResults.push({
                file,
                line,
                variableName,
                modifiedContent
              });
            }
          });
        }

      }
    } catch (err) {
      console.error(`Error searching file ${file}:`, err);
    }
  }

  return searchResults;
};

const SetUp = async (req, res) => {
  const { NodeSSH } = require('node-ssh');
  const ssh = new NodeSSH();
  const run = async () => {
    try {
      await ssh.connect({
        host: '81.0.246.139',
        port: 22,
        username: 'handsintechnology-autotest',
        password: 'sadashiv@612',
      });

      console.log('SSH connection established');
      const pwdCommand = 'pwd';
      const findAppCommand = 'find . \\( -path "./node_modules" -o -path "./nvm" -o -path "./tmp" \\) -prune -o -type f -name "app.js" -exec dirname {} \\;';
      const findServerCommand = 'find . \\( -path "./node_modules" -o -path "./nvm" -o -path "./tmp" \\) -prune -o -type f -name "server.js" -exec dirname {} \\;';
      const getPackageJsonCommand = 'find . \\( -path "./node_modules" -o -path "./nvm" -o -path "./tmp" \\) -prune -o -type f -name "package.json" -exec cat {} \\;';
      const commandResult = await ssh.execCommand(pwdCommand);
      if (commandResult.code === 0) {
        const directoryPath = commandResult.stdout.trim();
        const d = await searchFilesRemotely(directoryPath, "express()", ssh)
        console.log(d)
        return false
        //    
        const findAppResult = await ssh.execCommand(`cd ${directoryPath} && ${findAppCommand}`);
        const appDirectory = findAppResult.stdout.trim();

        if (appDirectory !== '') {
          const getPackageJsonResult = await ssh.execCommand(`cd ${appDirectory} && ${getPackageJsonCommand}`);
          const packageJsonContent = JSON.parse(getPackageJsonResult.stdout);
          console.log({ packageJsonContent })
          if (packageJsonContent && packageJsonContent.scripts?.start) {
            const start = packageJsonContent.scripts?.start
            if (start.includes('node')) {
              console.log('start script:', start);
            }

          }
          return false
          const installCommand = `cd ${appDirectory} && npm i auto-protect-node && npm install pm2`;
          const installResult = await ssh.execCommand(installCommand);
          console.log(installResult);

          const restartCommand = `cd ${appDirectory} && npx pm2 restart app.js`;
          const restartResult = await ssh.execCommand(restartCommand);
          console.log(restartResult);
        } else {
          const findServerResult = await ssh.execCommand(`cd ${directoryPath} && ${findServerCommand}`);
          const serverDirectory = findServerResult.stdout.trim();

          if (serverDirectory !== '') {
            const getPackageJsonResult = await ssh.execCommand(`cd ${serverDirectory} && ${getPackageJsonCommand}`);
            const packageJsonContent = JSON.parse(getPackageJsonResult.stdout);
            console.log({ packageJsonContent })
            const installCommand = `cd ${serverDirectory} && npm i auto-protect-node && npm install pm2`;
            const installResult = await ssh.execCommand(installCommand);
            console.log(installResult);
            const restartCommand = `cd ${serverDirectory} && npx pm2 restart server.js`;
            const restartResult = await ssh.execCommand(restartCommand);
            console.log(restartResult);
          } else {
            console.log('app.js or server.js not found');
          }
        }
      } else {
        console.error(`Failed to execute command: ${commandResult.stderr}`);
      }
    } catch (err) {
      console.error('Error connecting to SSH:', err);
    } finally {
      ssh.dispose(); // Close the SSH connection
    }
  };
  run();
}
// Register
Register = async (req, res) => {
  try {
    // const isValidHostname = await checkDomainAvailability(req.body.domain);
    const { containsSpecialCharacter, containsLowercase, containsUppercase, containsNumber } = await validatePassword(req.body.password)
    if (!containsSpecialCharacter) {
      return sendResponse(res, 406, "Please enter password 1 Special charater");
    }
    else if (!containsLowercase) {
      return sendResponse(res, 406, "Please enter password 1  Lowercase letter",);
    }
    else if (!containsUppercase) {
      return sendResponse(res, 406, "Please enter password 1  Uppercase letter",);
    }
    else if (!containsNumber) {
      return sendResponse(res, 406, "Please enter password 1  Number letter",);
    }
    const error = ValidateUserSignUp(req.body)
    if (error) {
      return sendResponse(res, 400, error,);
    }
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return sendResponse(res, 409, "Domain is already registered", {});
    }
    else if (!user) {
      const appid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
      var encrypted = CryptoJS.AES.encrypt(req.body.password, key).toString();
      const user = await User.create({
        email: req.body.email,
        password: encrypted,
        appid
      });
      await middlewareModel.create({
        user: user._id,
        appid,
        SqlDetectorMiddlware: true,
        BotMiddleware: true,
        VpnProtectMiddlware: true,
        SpamMiddleware: true,
        xssInjectionDetectorMiddlware: true,
        checkHTMLMiddlware: true,
        NosqlDetectorMiddlware: true,
        commandlineinjectionMiddlware: true,
        ldapInjectionDetectorMiddlware: false,
        BlockUserMiddlware: true
      })
      const token = jwt.sign({ id: user._id, appid: user.appid }, process.env.JWT_SECRET, { expiresIn: "1d" })
      return sendResponse(res, 200, "logibn successfully", { token, appid: user.appid });
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res)
  }
}
// Roles

// Login

Login = async (req, res) => {
  try {
    const error = ValidateUserLogin(req.body)
    if (error) {
      return sendResponse(res, 400, error,);
    }

    const user = await User.findOne({ email: req.body.email })
    if (user) {
      console.log(user.password)
      var bytes = CryptoJS.AES.decrypt(user.password, key);
      var decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (decrypted == req.body.password) {
        const token = jwt.sign({ id: user._id, appid: user.appid }, process.env.JWT_SECRET, { expiresIn: "1d" })
        return sendResponse(res, 200, "logibn successfully", { token, appid: user.appid });
      } else {
        return sendResponse(res, 406, "please enter valid credentials")
      }
    }
    else if (!user) {
      return sendResponse(res, 404, "user does not exist");
    }

  } catch (error) {
    console.log(error)
    return errorHandler(res)
  }

}


// =
GoogleRegister = async (req, res) => {
  try {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const profile = ticket.getPayload()
    const UserExists = await User.findOne({ email: profile.email })
    if (UserExists) {
      // Create token
      const token = jwt.sign(
        { user_id: UserExists._id, isAdmin: UserExists.isAdmin, email: UserExists.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      const tokenuser = {
        firstName: UserExists.firstName,
        lastName: UserExists.lastName,
        picture: UserExists.picture,
        email: UserExists.email,
        accessToken: token
      }

      return res.status(200).send(tokenuser)
    } else {
      const user = await User.create({
        firstName: profile.given_name,
        lastName: profile.family_name,
        picture: profile.picture,
        email: profile.email,
      })

      // Create token
      const token = jwt.sign(
        { user_id: user._id, isAdmin: user.isAdmin, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1m",
        }
      );

      const tokenuser = {
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        email: user.email,
        accessToken: token

      }
      // Getting the set Headers
      // Printing those headers

      return res.status(200).send(tokenuser)
    }
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }

}
Logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      Authenticate = false;
      return sendResponse(res, 403, "missing authorization", { Authenticate })
    }
    const [authType, token] = authHeader.split(' ');

    jwt.destroy(token)
    sendResponse(res, 200, "logout successfully")
  } catch (error) {
    console.log({ error });
    return errorHandler(res)
  }
}

// =
FBCustomerLogin = async function (req, res, next) {
  const {
    userID,
    accessToken,
  } = req.body;

  let fbUrl = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
  const response = await fetch(fbUrl, {
    method: "GET",
  })
  const data = await response.json()
  const { email, name, picture } = data

  var values = name.split(" ");
  var firstName = values[0];
  var lastName = name.substr(name.indexOf(' ') + 1);
  var profilepic = picture.data.url
  const UserExists = await User.findOne({ email })
  if (UserExists) {
    // Create token
    const token = jwt.sign(
      { user_id: UserExists._id, isAdmin: UserExists.isAdmin, email: UserExists.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );

    const tokenuser = {
      firstName: UserExists.firstName,
      lastName: UserExists.lastName,
      picture: UserExists.picture,
      email: UserExists.email,
      accessToken: token

    }

    // Getting the set Headers
    const headers = response.getHeaders();

    // Printing those headers

    return res.status(200).send(tokenuser)
  } else {
    const user = await User.create({
      firstName,
      lastName,
      picture: picture.data.url,
      email,
    })

    // Create token
    const token = jwt.sign(
      { user_id: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );

    const tokenuser = {
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      email: user.email,
      accessToken: token

    }

    // Getting the set Headers
    const headers = response.getHeaders();

    // Printing those headers

    return res.status(200).send(tokenuser)
  }
};
//   

const UserController = {
  Login,
  Logout,
  Register,
  GoogleRegister,
  FBCustomerLogin,
  SetUp
}

module.exports = {
  UserController
}
