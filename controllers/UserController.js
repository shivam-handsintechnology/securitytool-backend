const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const { checkDomainAvailability, validatePassword } = require("../utilities/functions/functions");
const CryptoJS = require("crypto-js");
const { middlewareModel } = require("../models/midlwaresModel");
const { v4: uuidv4 } = require('uuid');
const { ValidateUserSignUp, ValidateUserLogin } = require("../helpers/Validators");
const key = process.env.SECREY_KEY
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
      return sendResponse(res, 409, "email is already registered", {});
    }
    else if (!user) {
      const appid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
      var encrypted = CryptoJS.AES.encrypt(req.body.password, key).toString();
      const user = await User.create({
        email: req.body.email,
        password: encrypted,
        appid,

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
        // Set access token in a cookie
        res.cookie('access_token', token, { secure: false });

        return sendResponse(res, 200, "login successfully", { token, appid: user.appid });
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
const Profile = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    console.log(" accessToken", accessToken)
    const user = await User.findById(req.user.id)
    if (user) {
      return sendResponse(res, 200, "Fetch user", user);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  }
  catch (error) {
    console.log(error)
    return errorHandler(res)
  }
}
const UserController = {
  Login,
  Logout,
  Register,
  GoogleRegister,
  FBCustomerLogin,
  Profile
}

module.exports = {
  UserController
}
