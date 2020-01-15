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
      birthday: null,
      gender: "",
      id: null,
      editingProfile: false,
      editingPassword: false,
      password: "",
      confirmPassword: "",
      oldPassword: "",
      deletingUser: false
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

  changeHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  getUser = async () => {
    const user = await axios.get(`/api/user_info`);
    var date = new Date(user.data[0].birthday);
    var formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    this.setState({
      username: user.data[0].username,
      firstName: user.data[0].first_name,
      lastName: user.data[0].last_name,
      email: user.data[0].email,
      birthday: formattedDate,
      gender: user.data[0].gender,
      id: user.data[0].user_id
    })
  }

  editProfile = () => {
    if(this.state.editingProfile) {
      this.getUser();
      this.setState({
        editingProfile: false
      })
    } else {
      this.setState({
        editingProfile: true
      })
    }
  }

  editPassword = () => {
    if(this.state.editingPassword) {
      this.setState({
        password: "",
        confirmPassword: "",
        oldPassword: "",
        editingPassword: false
      })
    } else {
      this.setState({
        editingPassword: true
      })
    }
  }

  toggleDelete = () => {
    if(this.state.deletingUser) {
      this.setState({
        deletingUser: false
      });
    } else {
      this.setState({
        deletingUser: true
      });
    }
  }

  updateProfile = async () => {
    const { username, firstName, lastName, email, birthday, gender } = this.state;
    await axios
      .put('/api/update_user', {username, firstName, lastName, email, birthday, gender})
      .catch(err => alert(err.response.data));
    this.setState({
      editingProfile: false
    })
  }

  updatePassword = async () => {
    const { password, confirmPassword, oldPassword } = this.state;
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      await axios
        .put('/api/update_password', { password, oldPassword })
        .then(res => {
          if (res.status === 200) {
            this.editPassword();
          }
        })
        .catch(err => alert(err.response.data));
    }
  }

  deleteUser = async () => {
    await axios
      .delete('/api/delete_user')
      .then(res => alert(res.data))
      .catch(err => console.log(err));
    this.props.history.push('/');
    this.props.setUser("");
  }

  render() {
    return (
      <div className="profile">
        {
          this.props.user
          ?
            this.state.editingProfile
            ?
            <div>
              <form
                className=""
                onSubmit={e => {
                  e.preventDefault();
                  this.updateProfile();
                }}>
                <div className="profile-container profile-container-edit">
                  <div className="profile-item">
                    <h1>Username:</h1>
                    <input 
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  </div>
                  <div className="profile-item">
                    <h1>Birthday:</h1>
                    <input 
                      type="date"
                      name="birthday"
                      value={new Date(this.state.birthday)}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  </div>
                  <div className="profile-item">
                    <h1>Email:</h1>
                    <input 
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  </div>
                  <div className="profile-item">
                    <h1>First Name:</h1>
                    <input 
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  </div>
                  <div className="profile-item">
                    <h1>Last Name:</h1>
                    <input 
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  </div>
                  <div className="profile-item">
                    <h1>Gender:</h1>
                    <select
                      type="text"
                      required
                      name="gender"
                      value={this.state.gender}
                      onChange={e => this.changeHandler(e.target.name, e.target.value)}
                    >
                      <option value="" hidden></option>
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                      <option value="o">Other</option>
                    </select>
                  </div>
                </div>
                <div className="button-container edit-button-container">
                  <button
                    className="profile-button yes">Submit Changes</button>
                  <button
                    className="profile-button no"
                    onClick={this.editProfile}>Cancel</button>
                </div>
              </form>
            </div>
            :
            this.state.editingPassword
            ?
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.updatePassword();
                  }}>
                  <div className="profile-container profile-container-password">
                    <div className="profile-item">
                      <h1>New Password:</h1>
                      <input 
                        type="password"
                        name="password"
                        onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                    </div>
                    <div className="profile-item">
                      <h1>Confirm New Password:</h1>
                      <input 
                        type="password"
                        name="confirmPassword"
                        onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                    </div>
                    <div className="profile-item old-password">
                      <h1>Old Password:</h1>
                      <input 
                        type="password"
                        name="oldPassword"
                        onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                    </div>
                  </div>
                  <div className="button-container edit-button-container">
                    <button
                      className="profile-button yes">Submit Changes</button>
                    <button
                      className="profile-button no"
                      onClick={this.editPassword}>Cancel</button>
                  </div>
                </form>
              </div>
              :
              this.state.deletingUser
              ?
              <div className="message-container">
                <h1 className="warning">Deletion is final!</h1>
                <h1 className="warning">Are you sure you want to proceed?</h1>
                <button
                  className="profile-button yes"
                  onClick={this.toggleDelete}>No, take me back.</button>
                <button
                  className="profile-button no"
                  onClick={this.deleteUser}>Yes, delete my account.</button>
              </div>
              :
              <div>
                <div className="profile-container">
                  <div className="profile-item">
                    <h1>Username:</h1>
                    <h2>{this.state.username}</h2>
                  </div>
                  <div className="profile-item">
                    <h1>Birthday:</h1>
                    <h2>{this.state.birthday}</h2>
                  </div>
                  <div className="profile-item">
                    <h1>Email:</h1>
                    <h2>{this.state.email}</h2>
                  </div>
                  <div className="profile-item">
                    <h1>Name:</h1>
                    <h2>{this.state.firstName}&nbsp;{this.state.lastName}</h2>
                  </div>
                  <div className="profile-item">
                    <h1>Gender:</h1>
                      {
                        this.state.gender === 'm'
                        ?
                        <h2>Male</h2>
                        :
                        this.state.gender === 'f'
                        ?
                        <h2>Female</h2>
                        :
                        <h2>Other</h2>
                      }
                  </div>
                </div>
                <div className="button-container">
                  <button
                    className="profile-button"
                    onClick={this.editProfile}>Edit Profile</button>
                  <button
                    className="profile-button"
                    onClick={this.editPassword}>Change Password</button>
                  <button
                    className="profile-button no"
                    onClick={this.toggleDelete}>Delete Account</button>
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