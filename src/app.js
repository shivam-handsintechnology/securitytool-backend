// All Neccesary functions

const logger = require('./logger/logger');
const apirouter = require('./routes')
const checkVerification = require('./middlewares/verifyClient')
const { DBConnection } = require("./config/connection");
const JsSnippetController = require('./controllers/JsSnippetController');
const cors = require("cors"), path = require('path'), history = require('./helpers/connect-history-api-fallback'), fileUpload = require('express-fileupload'), express = require("express"); hpp = require('hpp'), morgan = require('morgan'), helmet = require('helmet'), bodyParser = require('body-parser'), dotenv = require('dotenv'), cluster = require("cluster"), os = require("os"), numCPUs = os.cpus().length, process = require("process");
// Connected to mongodb
dotenv.config();
DBConnection(process.env.MONGO_URI)
// Create Express APP
const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
// File Upload Functionality
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
// session and cookie configuration

app.get('/protected', JsSnippetController.JsSnippet);
app.post('/protected', JsSnippetController.getALlDataFromSnippet);
app.set('trust proxy', 1) // trust first proxy
app.use(hpp());
app.use(cors())
app.use(helmet())
// app.use(morgan('dev'))
app.disable('x-powered-by');
app.disable('etag');
const AutoProtectCode = require("../monitor")
app.use(AutoProtectCode.validateAndSetMiddleware)
app.use(apirouter)
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Serve up production assets
// app.use(express.static(path.join(__dirname, 'build')));

// // Let the React app handle any unknown routes
// // Serve up the index.html if Express doesn't recognize the route
// app.get('*', (req, res) => {
//   try {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

const PortNumber = 20000;
if (cluster.isPrimary) {
  //console.log(`Primary ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    //console.log(code, signal);
    //console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PortNumber, async function (req, res) {

    //console.log("Server started at port", PortNumber);
  });
  //console.log(`Worker ${process.pid} started`);
}
app.use(AutoProtectCode.testing())





