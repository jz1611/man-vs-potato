// Dependencies
import React from 'react';
import axios from 'axios';
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
      gender: "",
      id: null,
      edite: false
    }
  }

  componentDidMount = async () => {
    const user = await axios.get('/api/userSession').catch(err => alert(err.response.data));
    if(user) {
      this.props.setUser(user.data);
    }
    if (this.props.user) {
      this.getUser();
    }
  }

  getUser = async () => {
    const user = await axios.get(`/api/user_info/${this.props.user.username}`);
    var date = new Date(user.data[0].birthday);
    var formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    this.setState({
      username: user.data[0].username,
      firstName: user.data[0].first_name,
      lastName: user.data[0].last_name,
      email: user.data[0].email,
      DOB: formattedDate,
      gender: user.data[0].gender,
      id: user.data[0].user_id
    })
  }

  render() {
    return (
      <div className="profile">
        {
          this.props.user
          ?
          <div className="profile-container">
            <div className="profile-item">
              <h1>Username:</h1>
              <h2>{this.state.username}</h2>
            </div>
            <div className="profile-item">
              <h1>Name:</h1>
              <h2>{this.state.firstName}{this.state.lastName}</h2>
            </div>
            <div className="profile-item">
              <h1>Email:</h1>
              <h2>{this.state.email}</h2>
            </div>
            <div className="profile-item">
              <h1>DOB:</h1>
              <h2>{this.state.DOB}</h2>
            </div>
            <div className="profile-item">
              <h1>Gender:</h1>
              <h2>{this.state.gender}</h2>
            </div>
          </div>
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