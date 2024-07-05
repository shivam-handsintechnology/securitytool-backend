require("dotenv").config();
const User = require("../models/User")
const Subscription = require("../models/SubscriptionModel")
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const { ValidateUserSignUp, ValidateUserLogin } = require("../helpers/Validators");
const Razorpay = require("razorpay");
const key_id = process.env.NODE_ENV == "production" ? process.env.RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID_TEST
const key_secret = process.env.NODE_ENV == "production" ? process.env.RAZORPAY_KEY_SECRET : process.env.RAZORPAY_KEY_SECRET_TEST
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");
const { OtpGenerator } = require("../utils");
const sendEmail = require("../helpers/sendEmail");
const { checkDomainAvailability } = require("../utilities/functions/functions");
const instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});
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
              const modifiedContent = `${line}\n//console.log("je")`;

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
const Register = async (req, res) => {
  try {
    let expires
    // Validate user input
    const error = ValidateUserSignUp(req.body)
    if (error) {
      return errorHandler(res, 400, error,);
    }
    let isDomain = await checkDomainAvailability(req.body.domain)
    if (!isDomain) {
      return errorHandler(res, 400, "Domain Not Found On Server");
    }
    // Check if user exists
    const user = await User.findOne({ email: req.body.email })
    //   Check if otp in payload and user exists
    if (user && user.domain && user.domain == req.body.domain) {
      return errorHandler(res, 400, "Domain is already registred");
    }
    if (req.body.otp && user) {
      console.log(user.otp, req.body.otp)
      if (user.otp !== req.body.otp) {

        return sendResponse(res, 400, "Invalid OTP",);
      }
      if (req.body.otp == user.otp) {
        let subscription = await Subscription.create({ userId: user._id, appid: user.appid })
        user.otpisvalid = true
        user.subsription = subscription._id
        await user.save()
        return sendResponse(res, 201, "otp verified successfully", { otpisvalid: user.otpisvalid });
      }

    }
    // Check if user is verified
    else if (user && !user.otpisvalid) {
      user.otp = OtpGenerator()

      if (user.expiresAt) {
        expires = new Date(user.expiresAt).getMinutes()
      } else if (user.expiresAt) {
        expires = new Date(user.expiresAt).getMinutes()
      }
      await user.save()
      await sendEmail(req.body.email, "OTP Verification", `Your OTP is ${user.otp} it is expire in ${expires} minutes`)

      return sendResponse(res, 200, "otp sent successfully", { otpisvalid: user.otpisvalid, });
    }

    // Check if user is verified
    else if (user && user.otpisvalid) {
      return sendResponse(res, 409, "User already exists", { otpisvalid: user.otpisvalid });
    }
    // Encrypt password and create user
    else if (!user) {
      const appid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
      var encrypted = CryptoJS.AES.encrypt(req.body.password, key).toString();
      const user = await User.create({
        email: req.body.email,
        password: encrypted,
        appid,
        name: req.body.name,
        otp: OtpGenerator(),
        otpisvalid: false,
        domain: req.body.domain

      });
      if (user.expiresAt) {
        expires = new Date(user.expiresAt).getMinutes()
      }

      await sendEmail(req.body.email, "OTP Verification", `Your OTP is ${user.otp} it is expire in ${expires} minutes`)
      return sendResponse(res, 200, "otp sent successfully", { otpisvalid: user.otpisvalid, });
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error.message)
  }
}
// Roles

// Login

const Login = async (req, res, next) => {
  let status = 500;
  try {
    // Validate user input
    const error = ValidateUserLogin(req.body)
    if (error) {
      status = 400;
      throw new Error(error)
    }

    const user = await User.findOne({ email: req.body.email })
    // Check if user exists
    if (!user) {
      status = 400;
      throw new Error("user does not exist")
    }
    // Check if otp in payload and user exists
    if (req.body.otp && user) {
      console.log(user.otp, req.body.otp)
      if (user.otp !== req.body.otp) {
        return sendResponse(res, 400, "Invalid OTP",);
      }
      if (req.body.otp == user.otp) {
        let subscription = await Subscription.create({ userId: user._id, appid: user.appid })
        user.otpisvalid = true
        user.subsription = subscription._id
        await user.save()
        const token = jwt.sign({ id: user._id, appid: user.appid, subsription: user.subsription }, process.env.JWT_SECRET, { expiresIn: "1d" })
        return sendResponse(res, 201, "Otp Verified Successfully", { token, appid: user.appid });
      }
    }
    // Check if user is verified
    if (user && !user.otpisvalid) {
      user.otp = OtpGenerator()
      user.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      await user.save()

      let expires = new Date(user.expiresAt).getMinutes()
      sendEmail(req.body.email, "OTP Verification", `Your OTP is ${user.otp} it is expire in ${expires} minutes`)
      return sendResponse(res, 200, "otp sent successfully", { otpisvalid: user.otpisvalid, });
    }
    //  Check if user is verified
    var bytes = CryptoJS.AES.decrypt(user.password, key);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (decrypted !== req.body.password) {
      throw new Error("please enter valid credentials")
    }
    const token = jwt.sign({ id: user._id, appid: user.appid, subsription: user.subsription }, process.env.JWT_SECRET, { expiresIn: "1d" })

    return sendResponse(res, 201, "login successfully", { token, appid: user.appid });

  } catch (error) {
    return errorHandler(res, status || 500, error.message)
  }

}


// =
const GoogleRegister = async (req, res) => {
  try {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
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
const Logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const Authenticate = false;
    if (!authHeader) {

      return sendResponse(res, 403, "missing authorization", { Authenticate })
    }
    const [authType, token] = authHeader.split(' ');

    await jwt.destroy(token)
    sendResponse(res, 200, "logout successfully")
  } catch (error) {

    return errorHandler(res)
  }
}
const Checkout = async (req, res) => {
  try {
    const { amount, currency, receipt, payment_capture } = req.body

    const options = {
      amount: amount * 100,  // amount in smallest currency unit
      currency,
      receipt: "receipt",

    };

    const response = await instance.orders.create(options)
    console.log(response)
    return sendResponse(res, 200, "payment gateway integration", response)
  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error.message)
  }
}
const CheckoutSuccess = async (req, res) => {
  try {

    const { order_id, razorpay_payment_id, razorpay_signature } = req.body
    const { subsription } = req.user

    console.log(order_id, razorpay_payment_id, razorpay_signature)
    const order = await instance.orders.fetch(order_id)

    const payment = await validatePaymentVerification({ "order_id": order_id, "payment_id": razorpay_payment_id }, razorpay_signature, key_secret)

    if (!order) {
      return sendResponse(res, 404, "order not found")
    }
    else if (!payment) {
      return sendResponse(res, 404, "payment not found")
    }
    let subscription = await Subscription.findById(subsription)

    subscription.startDate = new Date()
    subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    await subscription.save()

    return sendResponse(res, 200, "payment success", order)
  } catch (error) {
    console.log(error.error)
    if (error.error && error.error.code === "BAD_REQUEST_ERROR") {
      return errorHandler(res, 400, error.error.description,)
    }
    return errorHandler(res, 500, error.message)
  }
}



// =
const FBCustomerLogin = async function (req, res) {
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


    // Printing those headers

    return res.status(200).send(tokenuser)
  }
};
//   
const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(["-userType", "-password"]).populate("subsription")
    if (user) {
      return sendResponse(res, 200, "Fetch user", user);
    } else {

      return sendResponse(res, 404, "User not found");
    }
  }
  catch (error) {

    return errorHandler(res)
  }
}
const UserController = {
  Login,
  Logout,
  Register,
  GoogleRegister,
  FBCustomerLogin,
  Profile,
  Checkout,
  CheckoutSuccess
}

module.exports = {
  UserController
}
