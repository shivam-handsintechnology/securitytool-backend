
const { v4: uuidv4 } = require('uuid');
const MiscellaneousAttacks = require('./MiscellaneousAttacks');
const { scanSQLvulnerability } = require('./scanClientData');
 module.exports = (wsServer) => {
  try {
    console.log("Websocket connection")
      // A new client connection request received
      wsServer.on('connection', function (socket) {
        console.log("Connected");
        socket.on("sql-injection", async function (message) {
            console.log("Received:", message);
            await scanSQLvulnerability(message,socket)
        });
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