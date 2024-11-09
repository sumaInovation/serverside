// const express = require('express');
// const app = express();
// const session = require('express-session')
// const passport = require('passport')
// const bodyparser = require('body-parser')
// const bcrypt = require('bcryptjs');
// const LocalStrategy = require('passport-local').Strategy;
// const MongoDBStore = require('connect-mongodb-session')(session);
// require('dotenv').config();
// const PORT=process.env.PORT||3000
// const store = new MongoDBStore({
//     uri: process.env.MONGODB_URL,
//     collection: 'mySessions'
// });

// // Catch errors
// store.on('error', function (error) {
//     console.log(error);
// });


// let user = {};
// //midlleware
// app.use(express.urlencoded({ extended: true }))
// app.use(bodyparser.json());

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))

// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         if (username != user.username) return done(null, false, { message: 'Incorrect username.' });
//         bcrypt.compare(password.toString(), user.password, (err, result) => {
//             if (err) return done(err);
//             if (!result) return done(null, false, { message: 'Incorrect password.' });
//             return done(null, user);
//         });

//     }
// ));
// app.use(passport.initialize());
// app.use(passport.session());


// //Routes
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body
//     user.username = username;
//     user.password = await bcrypt.hash(password.toString(), 10)
//     res.send("registration succuss");

// })

// app.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.send('success');
//     });
// app.get('/login', (req, res) => {
//     res.send("HOME");
// })
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });


// app.get('/welcome', (req, res) => {
//     console.log("Herer")
//     if (!req.isAuthenticated()) {
//     return res.redirect('/login');
//     }
//     res.send(`Welcome ${req.user.username} <a href="/test">Logout</a>`);
// });


// app.post('/logout', (req, res) => {
//     req.logout(()=>{
//         console.log("Succuess full logout")
//     });
//     res.redirect('/login');
// });



// server.js

const WebSocket = require('ws');
const express = require('express')
const app = express()
// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 3000 });

// Event listener for new client connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the newly connected client
  ws.send('Welcome to the WebSocket server!');

  // Handle messages received from the client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:3000');



const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// app.listen(PORT, () => {console.log(`Server is running on PORT:${PORT}`) });
