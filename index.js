require('dotenv').config();
const { SERVER_PORT } = process.env;
const server = require('./src');

// starting the server
server.app.listen(SERVER_PORT, () => console.log(`🚀 Server running on port ${SERVER_PORT}!`));
