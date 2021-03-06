require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');

const stripe = require('stripe')('sk_test_EOSlctXV4BIbyyxnzQGQCl9S00crQfwcte');

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const { register, login, logout, getUserSession } = require('./controllers/authController');
const { getUser, updateUser, updatePassword, deleteUser } = require('./controllers/profileController');
const { getBulkResults, searchRunnersOrderByLastName, addTime } = require('./controllers/resultsController');
const { getAllItems /*, getItem */} = require('./controllers/shopController');

const app = express();

app.use(require('body-parser').text());

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

app.use( express.static( `${__dirname}/../build` ) );

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
app.get('/api/user_info', getUser); // Uses session info to determine which users info
app.put('/api/update_user', updateUser); // Uses session info to determine which user
app.put('/api/update_password', updatePassword);
app.delete('/api/delete_user', deleteUser);

// Results
app.get('/api/bulk_results', getBulkResults);
app.get('/api/search_runners_order_last', searchRunnersOrderByLastName)
app.post('/api/add_time', addTime);

// Shop
app.get('/api/get_items', getAllItems);
// app.get('/api/get_item/:item_id', getItem);

// Stripe
app.post('/api/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example harge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));