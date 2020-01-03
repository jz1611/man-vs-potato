# Man vs. Potato

## Features
- Login and register users
- Display race results and data
- Search for individual race data
- Edit user profile and race times
- View and purchase race gear

## Client

### Dependencies
- axios
- redux
- react-redux
- react-router-dom
- http-proxy-middleware
- chartJS

### Routes
- Home (/)
- Register (/register)
- Login (/login)
- User Profile (/profile)
- Race Results (/results)
- Shop (/shop)

### File-Structure
- src/
  - App.js
  - App.css
  - reset.css
  - index.js
  - Components/
    - Home/
      - Home.js
      - Home.css
    - Register/
      - Register.js
      - Register.css
    - Login/
      - Login.js
      - Login.css
    - UserProfile/
      - UserProfile.js
      - UserProfile.css
    - RaceResults/
      - RaceResults.js
      - RaceResults.css
    - Shop/
      - Shop.js
      - Shop.css
  - redux/
    - reducer.js
    - store.js
  - setupProxy.js

## Server

### Dependencies
- express
- express-session
- dotenv
- bcryptjs
- massive

### Endpoints
#### Authorization
- login => /auth/login
- register => /auth/register
- logout => /auth/logout
- userSession => /api/user_session

#### Race Results Controller
- getResults => /api/get_results
- searchByName => /api/search

#### User Profile Controller
- getUser => /api/get_user/:userId
- updateUser => /api/update_user/:userId
- updatePassword => /api/update_password/:userId
- updateTimes => /api/update_times/:userId

#### Shop Controller
TO-DO

## Database

### Users
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,
  sex VARCHAR(1) NOT NULL,
  password TEXT NOT NULL
);
```

### Result Data
```sql
CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  user_id SERIAL FOREIGN KEY REFERENCES users(user_id),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_time TIME NOT NULL
);
```

### Shop
TO-DO