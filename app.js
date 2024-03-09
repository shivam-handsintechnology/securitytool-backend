// All Neccesary functions


const apirouter = require('./src/routes')
const checkVerification = require('./src/middlewares/verifyClient')
var express = require("express");
const path = require('path')
var cors = require("cors"), hpp = require('hpp'), morgan = require('morgan'), helmet = require('helmet'), bodyParser = require('body-parser')
const dotenv = require("dotenv")
const { DBConnection, corsOptions } = require("./src/config/connection");
const { AllowedDomainsModel } = require('./src/models/AllowedDomainsModel');
const JsSnippetController = require('./src/controllers/JsSnippetController');
var cluster = require("cluster"), os = require("os"), numCPUs = os.cpus().length, process = require("process");
dotenv.config();
var app = express();
var server = require("http").createServer(app);
// app.enable('trust proxy');
app.use(bodyParser.json({ limit: "50mb" }));
app.get('/protected', checkVerification, JsSnippetController.JsSnippet);
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
  server.listen(PortNumber, async function (req, res) {
    DBConnection(process.env.MONGO_URI)
    console.log("Server started at port", PortNumber);
  });
  console.log(`Worker ${process.pid} started`);
}

AutoProtectCode.testing(app, 'localhost', "ecc1c872-49a8-4083-b7e4-c78f4653f6f9")






