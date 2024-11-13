
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
//Add comment
const wss = new WebSocket.Server({server:server});
var dataincomming;
wss.on('connection', function connection(ws) {
    //**************************************** */
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("you pass value is:"+message);
    dataincomming=message;
   // Share message all connected client
   wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });    



    

     });
   
    //****************************** */
 
});

app.get('/', (req, res) => res.send(
  `incomming data:${dataincomming}`))

server.listen(3000, () => console.log(`Lisening on port :3000`))       