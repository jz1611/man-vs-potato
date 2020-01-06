require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

app.unsubscribe(express.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));

massive(CONNECTION_STRING).then(db => {
  console.log('Connected to database.');
  app.set('db', db)
});

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));