const fs = require('fs');
const https = require('https');
const app = require('./app');

// Replace with your actual local IP address
const IP_ADDRESS = '192.168.0.117'; 
const PORT = 3000;

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

// Create an HTTPS server
https.createServer(options, app).listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running on https://${IP_ADDRESS}:${PORT}`);
});
