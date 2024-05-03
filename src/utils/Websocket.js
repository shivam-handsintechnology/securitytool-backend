
const { v4: uuidv4 } = require('uuid');
const MiscellaneousAttacks = require('./MiscellaneousAttacks');
 module.exports = (wsServer) => {
    const clients = {};
    function broadcastMessage(json) {
        // We are sending the current data to all connected active clients
        const data = JSON.stringify(json);
        for (let userId in clients) {
            let client = clients[userId];
            if (client.readyState === wsServer.OPEN) {
                client.send(data);
            }
        };
    }
    function handleDisconnect(userId) {
        console.log(`${userId} disconnected.`);
        const json = { type: typesDef.USER_EVENT };
        const username = users[userId]?.username || userId;
        userActivity.push(`${username} left the document`);
        json.data = { users, userActivity };
        delete clients[userId];
        delete users[userId];
        broadcastMessage(json);
    }
    // A new client connection request received
    wsServer.on('connection', function (connection) {
        // Generate a unique code for every user
        const userId = uuidv4();
        console.log(`Received a new connection.`);

        // Store the new connection and handle messages
        clients[userId] = connection;
        console.log(`${userId} connected.`);
        connection.on('message', async function (message) {
            message=message.toString();
            console.log("Received:", message);
             await MiscellaneousAttacks(message,connection)

            // Parse the incoming message
             
        });
    });
 
    wsServer.on('close', () => handleDisconnect(userId));

}