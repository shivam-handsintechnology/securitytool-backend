
const { v4: uuidv4 } = require('uuid');
const MiscellaneousAttacks = require('./MiscellaneousAttacks');
const { scanSQLvulnerability, checkNonHTMLContentAccessibility } = require('./scanClientData');
 module.exports = (wsServer) => {
  try {
    console.log("Websocket connection")
      // A new client connection request received
      wsServer.on('connection', function (socket) {
        console.log("Connected");
        socket.on("sql-injection", async function (message) {
            console.log("Received:", message);
            socket.emit("sql-injection-started", { message: "SQL Injection test started" })
            await scanSQLvulnerability(message,socket).then((result) => {
                socket.emit("sql-injection-completed", result)
            })
        });
        socket.on("non-html-content-accessibility-submit", async function (data) {
            console.log("non-html-content-accessibility:", data);
             await checkNonHTMLContentAccessibility(data,socket).then((result) => {
                socket.emit("non-html-content-accessibility-completed", result)
             })
        }
        );

        socket.on('message', async function (message) {
            message=message
            console.log("Received:", message);
             await MiscellaneousAttacks(message,socket)
            // Parse the incoming message
             
        });
    });
  } catch (error) {
    console.log("Error in Websocket connection", error)
  }
 

}