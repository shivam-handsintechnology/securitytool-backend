// All Neccesary functions


const apirouter = require('./src/routes')
const checkVerification = require('./src/middlewares/verifyClient')
var express = require("express");
var session = require('express-session')
const cookieParser = require('cookie-parser');
var cors = require("cors"), hpp = require('hpp'), morgan = require('morgan'), helmet = require('helmet'), bodyParser = require('body-parser')
const dotenv = require("dotenv")
const { DBConnection } = require("./src/config/connection");
const JsSnippetController = require('./src/controllers/JsSnippetController');
var cluster = require("cluster"), os = require("os"), numCPUs = os.cpus().length, process = require("process");
dotenv.config();
// Connected to mongodb
DBConnection(process.env.MONGO_URI)
var app = express();
// Use cookie-parser middleware to parse cookies

app.use(bodyParser.json({ limit: "50mb", extended: true }));
// session and cookie configuration

app.get('/protected', checkVerification, JsSnippetController.JsSnippet);
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 * 60 * 24 * 7 } // 1 week
}))
app.use(hpp());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.disable('x-powered-by');
app.disable('etag');
// const AutoProtectCode = require('./auto')
const AutoProtectCode = require("tool")
AutoProtectCode.validateAndSetMiddleware(app, 'localhost', "ecc1c872-49a8-4083-b7e4-c78f4653f6f9")
// AutoProtectCode(app, domain = 'autotest.handsintechnology.in', appid = "ecc1c872-49a8-4083-b7e4-c78f4653f6f97")
app.use(apirouter)
const PortNumber = 20000;
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(code, signal);
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PortNumber, async function (req, res) {

    console.log("Server started at port", PortNumber);
  });
  console.log(`Worker ${process.pid} started`);
}

AutoProtectCode.testing(app, 'localhost', "ecc1c872-49a8-4083-b7e4-c78f4653f6f9")






