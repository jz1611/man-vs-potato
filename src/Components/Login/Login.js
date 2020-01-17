// Dependencies
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';
import Loading from '../Loading/Loading';

// CSS
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  login = async () => {
    this.setState({
      loading: true
    })
    let { username, password } = this.state;
    const user = await axios.post('/api/login', { username, password }).catch(err => alert(err.response.data));
    if(user) {
      this.props.setUser(user.data);
      this.props.history.push('/profile');
    }
    this.setState({
      loading: false
    })
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(Login);