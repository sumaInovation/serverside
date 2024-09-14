const express = require('express');
const app = express();
const session = require('express-session')
const passport = require('passport')
const bodyparser = require('body-parser')
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();
const PORT=process.env.PORT||3000
const store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'mySessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});


let user = {};
//midlleware
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username != user.username) return done(null, false, { message: 'Incorrect username.' });
        bcrypt.compare(password.toString(), user.password, (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        });

    }
));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    user.username = username;
    user.password = await bcrypt.hash(password.toString(), 10)
    res.send("registration succuss");

})

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.send('success');
    });
app.get('/login', (req, res) => {
    res.send("HOME");
})
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


app.get('/welcome', (req, res) => {
    console.log("Herer")
    if (!req.isAuthenticated()) {
    return res.redirect('/login');
    }
    res.send(`Welcome ${req.user.username} <a href="/test">Logout</a>`);
});


app.post('/logout', (req, res) => {
    req.logout(()=>{
        console.log("Succuess full logout")
    });
    res.redirect('/login');
});
app.listen(PORT, () => {console.log(`Server is running on PORT:${PORT}`) });