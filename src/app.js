// Import external modules
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')
const express = require("express");
const helmet = require('helmet')
const dotenv = require('dotenv')
const cluster = require("cluster")
const os = require("os")
const http = require('http');
const mongoSanitize = require('express-mongo-sanitize');
const process = require("process");
// import internal modules
// app.js or server.js

// Rest of your application code.
const logger = require('./logger/logger');
const apirouter = require('./routes')

const { DBConnection } = require("./config/connection"); // Database connection
const { CronJobVIdeoDelete } = require('./utils');
const SEO = require('./models/SEO.Model');
const numCPUs = os.cpus().length // Get the number of CPU cores
// Connected to mongodb
dotenv.config(); // Load environment variables
DBConnection(process.env.MONGO_URI)// Connect to MongoDB
const app = express(); // Create Express APP
const server = http.createServer(app);


// Session middleware setup
app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs'); // Set the view engine to ejs
app.use(cors());

app.use(express.urlencoded({ extended: true })); // body parser 
app.use(express.json({ limit: "50mb", extended: true })); // body parser
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },   // File Upload Functionality
}));
app.use(express.static(path.join(__dirname, "build")))
app.use("/static", express.static(path.join(__dirname, "public"))); // Serve static files

app.use(helmet()) // Secure your app by setting various HTTP headers
// Set up session middleware with MongoDB store
app.use(apirouter) // Use the API router

// Middleware to handle routes for SPA
// Middleware to handle routes for SPA
let ChangeHtml = `<title>Security Tool</title>`
app.use("/*", async (req, res) => {
  try {
    const buildpath = path.join(__dirname, "build", "index.html");
    if (!fs.existsSync(buildpath)) {
      return res.status(404).json({ message: "Resource is Not Found" });
    }

    const raw = fs.readFileSync(buildpath, 'utf8');
    let url = req.originalUrl === "/" ? "home" : req.originalUrl.replace(/\//g, "");
    console.log("url", req.originalUrl);

    // Mongoose aggregation
    const [seoData] = await SEO.aggregate([
      { $match: { url: url } },
      { $limit: 1 }
    ]);

    console.log(seoData ? "SEO data found" : "No SEO data found");

    // Default home page SEO

    let metaTags = `
        <title>Welcome to Our Website</title>
        <meta name="description" content="Explore our amazing content and services">
        <meta name="keywords" content="home, welcome, website">
      `;
    let updated = raw.replace(ChangeHtml, metaTags);
    if (!seoData || !seoData.meta_data || seoData.meta_data.length === 0) {
      // Default home page SEO
      metaTags = `
        <title>Welcome to Our Website</title>
        <meta name="description" content="Explore our amazing content and services">
        <meta name="keywords" content="home, welcome, website">
      `;
    } else {
      // Construct meta tags for all items in the meta_data array
      metaTags = seoData.meta_data.map(metaData => `
        <title>${metaData.title}</title>
        <meta name="description" content="${metaData.description}">
        <meta name="keywords" content="${metaData.keywords.join(', ')}">
      `).join('');
    }

    // Replace __PAGE_META__ with the constructed meta tags
    updated = raw.replace(ChangeHtml, metaTags);

    // Send the updated HTML
    return res.send(updated);

  } catch (error) {
    console.error('Error updating meta tags:', error);
    return res.status(500).json({ message: "Error updating meta tags" });
  }
})

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
const PortNumber = process.env.PORT || 20000;
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

setInterval(() => {
  CronJobVIdeoDelete()
}, 600000); // Cron job for video deletion
// CLeanDatabase() // Clean the database

module.exports = app;









