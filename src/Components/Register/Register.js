// Dependencies
import React from 'react';

// CSS
import './Register.css';

export default class Register extends React.Component {
  render() {
    return (
      <div className="register">
        <h1 className="page-title">Registration</h1>
        <form className="registration-form">
          <div className="user-input">
            <h2>First Name:</h2>
            <input 
              type="text"
              required
            />
          </div>
          <div className="user-input">
            <h2>Last Name:</h2>
            <input
              type="text"
              required
            />
          </div>
          <div className="user-input">
            <h2>Username:</h2>
            <input
              type="text"
              required
            />
          </div>
          <div className="user-input">
            <h2>Email:</h2>
            <input
              type="text"
              required
            />
          </div>
          <div className="user-input">
            <h2>Date of Birth:</h2>
            <input 
              type="date"
              required
            />
          </div>
          <div className="user-input">
            <h2>Gender:</h2>
            <select
              name="gender"
              type="text"
              required
            >
              <option selected disabled hidden></option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
          </div>
          <div className="user-input">
            <h2>Password:</h2>
            <input
              type="password"
              required
            />
          </div>
          <div className="user-input">
            <h2>Confirm Password:</h2>
            <input
              type="password"
              required
            />
          </div>
          <button
            className="register-submit"
          >Submit</button>
        </form>
      </div>
    )
  }
}