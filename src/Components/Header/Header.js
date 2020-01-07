// Dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// CSS
import './Header.css';

export default class Header extends React.Component {
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
              activeClassName='active-link'>Race Results</NavLink>
            <NavLink
              exact to='shop'
              className='link'
              activeClassName='active-link'>Shop</NavLink>
          </nav>
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
        </div>
      </header>
    )
  }
}