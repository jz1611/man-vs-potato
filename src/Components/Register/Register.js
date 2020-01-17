// Dependencies
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Loading from '../Loading/Loading';

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
      newConfirmPass: "",
      loading: false
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  register = async () => {
    this.setState({
      loading: true
    });
    let {newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword, newConfirmPass} = this.state;
    if (newPassword !== newConfirmPass) {
        this.setState({
          loading: false
        });
        alert('Passwords do not match.');
      } else {
        const user = await axios.post('/api/register', { newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword }).catch(err => alert(err.response.data));
        
        if(user) {
          this.props.setUser(user.data)
          this.props.history.push('/profile');
        }
        this.setState({
          loading: false
        });
    }
  }

  changeHandler(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      !this.state.loading
      ?
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
              value={this.state.newFirst}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Last Name:</h2>
            <input
              type="text"
              required
              name="newLast"
              value={this.state.newLast}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Username:</h2>
            <input
              type="text"
              required
              name="newUsername"
              value={this.state.newUsername}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Email:</h2>
            <input
              type="text"
              required
              name="newEmail"
              value={this.state.newEmail}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Date of Birth:</h2>
            <input 
              type="date"
              required
              name="newDOB"
              value={this.state.newDOB}
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Gender:</h2>
            <select
              type="text"
              required
              name="newGender"
              value={this.state.newGender}
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
      :
      <div className="results-loading">
        <Loading type={'bubbles'} color={'rgb(77, 194, 248)'} height={250} width={350}/>
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