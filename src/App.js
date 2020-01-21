// Dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import RaceResults from './Components/RaceResults/RaceResults';
import Shop from './Components/Shop/Shop';
import Cart from './Components/Cart/Cart';

// CSS
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/results" component={RaceResults} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
      {/* <div className="acknowledge">
        <div className="author">Website by Jeff Zivkovic</div>
        <div className='credit'>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div> */}
    </div>
  );
}

export default App;
