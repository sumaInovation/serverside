const {google}=require('googleapis')
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server});
app.use(express.json())
// GoogleAPIs
const auth = new google.auth.GoogleAuth({
  keyFile: "secret.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});  
const spreadsheetId = "1x8y0yqdBu1ptMVXWEXnjEpQ3hvW1nOro6umzLnwKczI";
// Create client instance for auth
const client =  auth.getClient();
// Instance of Google Sheets API
const googleSheets = google.sheets({ version: "v4", auth: client });
// Get metadata about spreadsheet
const metaData =  googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});
var dataincomming;

  


 

 
  
 



wss.on('connection',  function connection(ws) {
    //**************************************** */
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message',  function incoming(message) {
    console.log('received: %s', message);
    
    // Save Datat in Google sheets
   
   



    ws.send("you pass value is:"+message);
    dataincomming=message;
   // Share message all connected client
   wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });    

    //Save Ongoogle sheet
    const Name="Sumanga"
   const Email="sumaautomation.lk"
   const Message="Test Message"
   // Write row(s) to spreadsheet
   googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[Name, Email,Message]],
    }})

    
  
     });
   
    //****************************** */
 
});

app.get('/', (req, res) => res.send(
  `incomming data:${dataincomming}`))

server.listen(3000, () => console.log(`Lisening on port :3000`))       




 
/*
  
  });

    // Read rows from spreadsheet
  const getRows =  googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:C",
  });
  console.log(getRows.data);


*/