// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/reducer';

// CSS
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      DOB: null,
      gender: ""
    }
  }

  render() {
    return (
      <div className="profile">
        {
          this.props.user
          ?
          <h1>{this.props.user.username}</h1>
          :
          <div className="login-message">
            <h2 className="page-title">Please log in or register.</h2>
          </div>
        }
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

export default connect(mapReduxStateToProps, mapDispatchToProps)(UserProfile);