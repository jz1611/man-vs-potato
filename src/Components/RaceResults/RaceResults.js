// Dependencies
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';

// CSS
import './RaceResults.css';

class RaceResults extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loading_search: false,
      totalRunners: 0,
      totalTimes: 0,
      topMale: {},
      topFemale: {},
      first_name: "",
      last_name: "",
      mappedRunners: [],
      start_time: "00:00:00",
      end_time: "00:00:00"
    }
  }

  componentDidMount = async () => {
    this.getBulkResults();
  }

  changeHandler = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  getBulkResults = async () => {
    const results = await axios.get('/api/bulk_results').catch(err => console.log(err));
    this.setState({
      totalRunners: results.data[0],
      totalTimes: results.data[1],
      topMale: results.data[2],
      topFemale: results.data[3],
      loading: false
    });
  }

  searchRunnersOrderLast = async () => {
    this.setState({
      loading_search: true
    });
    const { first_name, last_name } = this.state;
    const foundRunners = await axios.get(`/api/search_runners_order_last?first_name=${first_name}&last_name=${last_name}`).catch(err => console.log(err));
    const mappedRunners = foundRunners.data.map(runner => {
      return (
        <div
          className="search-result"
          key={runner.result_id}>
          <h1 className="result-name">{runner.first_name}&nbsp;{runner.last_name}</h1>
          <h2 className="result-time">{runner.total_time}</h2>
          {
            runner.gender === 'm'
            ?
            <h2 className="result-info">Male</h2>
            :
            runner.gender === 'f'
            ?
            <h2 className="result-info">Female</h2>
            :
            <h2 className="result-info">Other</h2>
          }
        </div>
      );
    });
    
    this.setState({
      mappedRunners: mappedRunners,
      loading_search: false
    })
  }

  addTime = async () => {
    const { id } = this.props.user;
    const user_id = id;
    const { start_time, end_time } = this.state;
    let moment_start_time = moment.utc(start_time, "hh:mm:ss");
    let moment_end_time = moment.utc(end_time, 'hh:mm:ss');
    if (moment_start_time >= moment_end_time) {
      alert("Start time must be before end time.");
      return;
    }
    let total_time = moment_end_time.diff(moment_start_time, 'seconds')
    total_time = moment("1900-01-01 00:00:00").add(total_time, 'seconds').format("HH:mm:ss");
    await axios
      .post('/api/add_time', { user_id, start_time, end_time, total_time })
      .then(res => {
        alert(res.data)
      })
      .catch(err => console.log(err));
    this.setState({
      start_time: "00:00:00",
      end_time: "00:00:00"
    })
  }

  render() {
    return (
      this.state.loading
      ?
      <div className="results-loading">
        <Loading type={'bubbles'} color={'rgb(77, 194, 248)'} height={250} width={350}/>
      </div>
      :
      <div className="results-page">
        <div className="results-container">
          <div className="bulk-results">
            <h1 className="results-title">Total Runners:</h1>
            <h2 className="results-data">{this.state.totalRunners}</h2>
            <h1 className="results-title">Total Times:</h1>
            <h2 className="results-data">{this.state.totalTimes}</h2>
            {
              this.state.topMale
              ?
              <div>
                <h1 className="results-title">Top Male:</h1>
                <h2 className="results-data" style={{marginBottom: 0}}>{this.state.topMale.first_name}&nbsp;{this.state.topMale.last_name}</h2>
                <h2 className="results-data">{this.state.topMale.total_time}</h2>
              </div>
              :
              <div>
                <h1 className="results-title">Top Male:</h1>
                <h2 className="results-data">No Male Times</h2>
              </div>
            }
            {
              this.state.topFemale
              ?
              <div>
                <h1 className="results-title">Top Female:</h1>
                <h2 className="results-data" style={{marginBottom: 0}}>{this.state.topFemale.first_name}&nbsp;{this.state.topFemale.last_name}</h2>
                <h2 className="results-data">{this.state.topFemale.total_time}</h2>
              </div>
              :
              <div>
                <h1 className="results-title">Top Female:</h1>
                <h2 className="results-data">No Female Times</h2>
              </div>
            }
          </div>
          <div>
            <div className="search-container">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.searchRunnersOrderLast();
                }}>
                <h1 className="results-title">Search Runners:</h1>
                <div className="search-box">
                  <h1 className="search-title">First Name:</h1>
                  <input
                    className="search-input"
                    name='first_name'
                    type='text'
                    value={this.state.first_name}
                    onChange={e => this.changeHandler(e.target.name, e.target.value)}/>
                  <h1 className="search-title">Last Name:</h1>
                  <input
                    className="search-input"
                    name='last_name'
                    type='text'
                    value={this.state.last_name}
                    onChange={e => this.changeHandler(e.target.name, e.target.value)}/>
                  <button className="search-button">Search</button>
                </div>
              </form>
            </div>
            <div className="time-container">
              {
                this.props.user
                ?
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.addTime();
                  }}>
                  <h1 className="results-title">Add Time:</h1>
                  <h1 className="search-title">Start Time:</h1>
                  <input
                    className="search-input"
                    type="time"
                    step="1"
                    name='start_time'
                    value={this.state.start_time}
                    onChange={e => this.changeHandler(e.target.name, e.target.value)} />
                  <h1 className="search-title">End Time:</h1>
                  <input
                    className="search-input"
                    type="time"
                    step="1"
                    name='end_time'
                    value={this.state.end_time}
                    onChange={e => this.changeHandler(e.target.name, e.target.value)}/>
                  <button className="search-button">Submit</button>
                </form>
                :
                <h1 className="login-time-message">Log in to add time.</h1>
              }
            </div>
          </div>
          <div className="search-results">
            <h1 className="results-title">Search Results:</h1>
            {
              !this.state.loading_search
              ?
              (
              this.state.mappedRunners.length
              ?
              <div className="search-box">
                {this.state.mappedRunners}
              </div>
              :
              <h1>Please edit your search.</h1>
              )
              :
              <Loading type={'bubbles'} color={'rgb(77, 194, 248)'} height={75} width={150}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapReduxStateToProps)(RaceResults);