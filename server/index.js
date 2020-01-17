require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const { register, login, logout, getUserSession } = require('./controllers/authController');
const { getUser, updateUser, updatePassword, deleteUser } = require('./controllers/profileController');
const { getBulkResults, searchRunnersOrderByLastName, addTime } = require('./controllers/resultsController');
const { getAllItems, addItemToCart, removeItemFromCart } = require('./controllers/shopController');

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
app.post('/api/add_to_cart', addItemToCart);
app.delete('/api/remove_from_cart/:item_id', removeItemFromCart);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));