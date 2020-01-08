require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const { register, login, logout, getUserSession } = require('./controllers/authController');
// const { getUserInfo } = require('./controllers/profileController');
const app = express();

app.use(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));
// app.use(checkForSession);

massive(CONNECTION_STRING).then(db => {
  console.log('Connected to database.');
  app.set('db', db)
});

// Authorization
app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/logout', logout);
app.get('/api/userSession', getUserSession);

// Profile
// app.get('/api/user_info', getUserInfo);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));