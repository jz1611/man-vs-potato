// Dependencies
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';

// CSS
import './Register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      newFirst: "",
      newLast: "",
      newUsername: "",
      newEmail: "",
      newDOB: null,
      newGender: "",
      newPassword: "",
      newConfirmPass: ""
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  register = async () => {
    let {newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword, newConfirmPass} = this.state;
    if (newPassword !== newConfirmPass) {
      alert('Passwords do not match.');
    } else {
      const user = await axios.post('/api/register', { newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword }).catch(err => alert(err.response.data));
      
      if(user) {
        this.props.setUser(user.data)
        this.props.history.push('/profile');
      }
    }
  }

  changeHandler(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <div className="register">
        <h1 className="page-title">Registration</h1>
        <form
          className="registration-form"
          onSubmit={e => {
            e.preventDefault();
            this.register();
          }} >
          <div className="user-input">
            <h2>First Name:</h2>
            <input 
              type="text"
              required
              name="newFirst"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Last Name:</h2>
            <input
              type="text"
              required
              name="newLast"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Username:</h2>
            <input
              type="text"
              required
              name="newUsername"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Email:</h2>
            <input
              type="text"
              required
              name="newEmail"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Date of Birth:</h2>
            <input 
              type="date"
              required
              name="newDOB"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Gender:</h2>
            <select
              type="text"
              required
              name="newGender"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            >
              <option value="" hidden></option>
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
              name="newPassword"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Confirm Password:</h2>
            <input
              type="password"
              required
              name="newConfirmPass"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
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

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Register);