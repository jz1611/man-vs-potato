// Dependencies
import React from 'react';
import axios from 'axios';

// CSS
import './Login.css';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  login = async () => {
    let { username, password } = this.state;
    const user = await axios.post('/api/login', { username, password }).catch(err => alert(err.response.data));
    if(user) {
      this.props.history.push('/profile');
    }
  }

  changeHandler(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <div className="login">
        <h1 className="page-title">Login</h1>
        <form
          className="login-form"
          onSubmit={e => {
            e.preventDefault();
            this.login();
          }} >
          <div className="user-input">
            <h2>Username:</h2>
            <input
              type="text"
              required
              name="username"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <div className="user-input">
            <h2>Password:</h2>
            <input
              type="password"
              required
              name="password"
              onChange={e => this.changeHandler(e.target.name, e.target.value)}
            />
          </div>
          <button
            className="login-submit"
          >Login</button>
        </form>
      </div>
    )
  }
}