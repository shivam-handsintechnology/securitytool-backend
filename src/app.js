// Import external modules
const cors = require("cors")
const fileUpload = require('express-fileupload')
const express = require("express");
const hpp = require('hpp')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cluster = require("cluster")
const os = require("os")
const http = require('http');
const WebSocket = require('ws');
const process = require("process");
// import internal modules
const logger = require('./logger/logger');
const apirouter = require('./routes')
const { DBConnection } = require("./config/connection"); // Database connection
const numCPUs = os.cpus().length // Get the number of CPU cores
// Connected to mongodb
dotenv.config(); // Load environment variables
DBConnection(process.env.MONGO_URI) // Connect to MongoDB
const app = express(); // Create Express APP
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });
app.set('view engine', 'ejs'); // Set the view engine to ejs
app.use(express.urlencoded({ extended: true })); // body parser 
app.use(cors()) // Enable CORS
app.use(express.json({ limit: "50mb", extended: true })); // body parser
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },   // File Upload Functionality
}));
app.set('trust proxy', 1) // trust first proxy
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(helmet()) // Secure your app by setting various HTTP headers
app.use(apirouter) // Use the API router
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

  server.listen(PortNumber, async function (req, res) {
    console.log(`Server is running on port ${PortNumber}`);
  });
}
require("./utils/Websocket")(wsServer)









