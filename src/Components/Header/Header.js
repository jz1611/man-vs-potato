// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import axios from 'axios';

// CSS
import './Header.css';

class Header extends React.Component {
  componentDidMount = async () => {
    const user = await axios.get('/api/userSession').catch(err => alert(err.response.data));
    if(user) {
      this.props.setUser(user.data);
    }
  }

  logout = () => {
    axios.post('/api/logout').catch(err => console.log(err));
    this.props.setUser("");
  }

  render() {
    return (
      <header>
        <div className="nav-container">
          <nav>
            <NavLink
              exact to='/'
              className='link'
              activeClassName='active-link'>Home</NavLink>
            <NavLink
              exact to='/results'
              className='link'
              activeClassName='active-link'>Results</NavLink>
            <NavLink
              exact to='shop'
              className='link'
              activeClassName='active-link'>Shop</NavLink>
          </nav>
          {
            !this.props.user
            ?
            <div className='auth'>
              <NavLink
                exact to='/register'
                className='auth-link'
                activeClassName='active-auth-link'>Register</NavLink>
              <NavLink
                exact to='/login'
                className='auth-link'
                activeClassName='active-auth-link'>Login</NavLink>
            </div>
            :
            <div className='logged-in'>
              <NavLink
                exact to='/profile'
                className='link'
                activeClassName='active-link' >Profile</NavLink>
              <button
                className='auth-link logout'
                onClick={this.logout} >Logout</button>
            </div>
          }
        </div>
      </header>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Header);