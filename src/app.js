// All Neccesary functions

const logger = require('./logger/logger');
const apirouter = require('./routes')
const path=require("path")
const checkVerification = require('./middlewares/verifyClient')
const { DBConnection } = require("./config/connection");
const JsSnippetController = require('./controllers/JsSnippetController');
const cors = require("cors"), fileUpload = require('express-fileupload'), express = require("express"); hpp = require('hpp'), helmet = require('helmet'), dotenv = require('dotenv'), cluster = require("cluster"), os = require("os"), numCPUs = os.cpus().length, process = require("process");
// Connected to mongodb
dotenv.config();
DBConnection(process.env.MONGO_URI)
// Create Express APP
const app = express();
app.set('view engine', 'ejs');
app.use(express.json({ limit: "50mb", extended: true }));
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

app.disable('x-powered-by');
app.disable('etag');
app.use("/api",apirouter)
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
 return res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
 let statusCode= err.statusCode || 500;
 let message= err.message || 'Something broke!';
  return res.status(statusCode).json({ message });
});

// 404 Error handling middleware
app.use((req, res) => {
    // Render the welcome page (views/welcome.ejs)
    res.status(404).render('404', { message: 'requested Method Not FOund' });
});
// Cluster setup
const PortNumber = 20000;
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PortNumber, async function (req, res) {
    console.log(`Server is running on port ${PortNumber}`);
  });
}






