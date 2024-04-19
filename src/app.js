// All Neccesary functions
const session = require('express-session');
const cors = require("cors")
const fileUpload = require('express-fileupload')
const express = require("express");
const hpp = require('hpp')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cluster = require("cluster")
const os = require("os")
const process = require("process");
const path = require("path")
const logger = require('./logger/logger');
const apirouter = require('./routes')
const checkVerification = require('./middlewares/verifyClient')
const { DBConnection } = require("./config/connection");
const JsSnippetController = require('./controllers/JsSnippetController');
const numCPUs = os.cpus().length
// Connected to mongodb
dotenv.config();
DBConnection(process.env.MONGO_URI)
// Create Express APP
const app = express();
// /*
// const Nodemonitor=require("monitornodejstestversion")
// const appid = '8dae6ee9-ad81-417a-93a0-f60a7e9e570c'; // Replace with your app ID
// app.use(Nodemonitor.testing)
// app.use(Nodemonitor.validateAndSetMiddleware(appid))
// */
// Configure express-session middleware
app.use(session({
  secret: 'your_secret_key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set secure to true if using HTTPS
    maxAge: 86400000 // Max age of the session cookie in milliseconds (1 day in this example)
  }
}));
app.set('view engine', 'ejs');
app.use(express.json({ limit: "50mb", extended: true }));
// File Upload Functionality
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
// session and cookie configuration
app.set('trust proxy', 1) // trust first proxy
app.use(hpp());
app.use(cors())
app.use(helmet())
app.get('/protected', JsSnippetController.JsSnippet);
app.post('/protected', JsSnippetController.getALlDataFromSnippet);
app.use("/api", apirouter)
// Serve static files for your frontend
app.use(express.static(path.join(__dirname, '../client')));


// Handle other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'public', 'index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something broke!';
  return res.status(statusCode).json({ message });
});

// 404 Error handling middleware
app.use((req, res) => {
  // Render the welcome page (views/welcome.ejs)
  res.status(404).render('404', { message: 'requested Method Not FOund' });
});
app.get('/*/health', (req, res) => {
  res.status(200).send('Server is up and running');
}
);
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









