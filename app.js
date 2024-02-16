// All Neccesary functions
const apirouter = require('./src/routes')
const authrouter = require('./src/routes/UserRoutes')
const checkVerification = require('./src/middlewares/verifyClient')
var express = require("express");
const path = require('path')
var cors = require("cors"), hpp = require('hpp'), morgan = require('morgan'), helmet = require('helmet'), bodyParser = require('body-parser')
const dotenv = require("dotenv")
const { DBConnection, corsOptions } = require("./src/config/connection");
const { AllowedDomainsModel } = require('./src/models/AllowedDomainsModel');
const JsSnippetController = require('./src/controllers/JsSnippetController');
const { Project_Security_Logs } = require('./src/models/Project_Security_Logs');
var cluster = require("cluster"), os = require("os"), numCPUs = os.cpus().length, process = require("process");
dotenv.config();
var app = express();
var server = require("http").createServer(app);
app.enable('trust proxy');
app.use(bodyParser.json({ limit: "50mb" }));
app.get('/protected', checkVerification, JsSnippetController.JsSnippet);
app.use(hpp());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.disable('x-powered-by');
app.disable('etag');
// const AutoProtectCode = require('./auto')
// AutoProtectCode(app, domain = 'autotest.handsintechnology.in', appid = "6f891635-cb99-4d8c-80bb-7a4261ec9997")
app.use(apirouter)
app.use('/api/auth', authrouter)
const PortNumber = 8080;
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();

  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(code, signal);
    console.log(`worker ${worker.process.pid} died`);

    // cluster.fork();
  });
} else {
  server.listen(PortNumber, async function (req, res) {
    DBConnection(process.env.MONGO_URI)
    console.log("Server started at port", PortNumber);
  });
  console.log(`Worker ${process.pid} started`);
}
