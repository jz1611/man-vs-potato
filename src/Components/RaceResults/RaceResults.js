// Dependencies
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// CSS
import './RaceResults.css';

class RaceResults extends React.Component {
  constructor() {
    super();
    this.state = {
      totalRunners: 0,
      totalTimes: 0,
      topMale: {},
      topFemale: {},
      first_name: "",
      last_name: "",
      mappedRunners: []
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
      topFemale: results.data[3]
    });
  }

  searchRunnersOrderLast = async () => {
    const { first_name, last_name } = this.state;
    const foundRunners = await axios.get(`/api/search_runners_order_last?first_name=${first_name}&last_name=${last_name}`).catch(err => console.log(err));
    const mappedRunners = foundRunners.data.map(runner => {
      return (
        <div key={runner.user_id}>
          <h1>{runner.first_name}&nbsp;{runner.last_name}</h1>
          <h2>Age</h2>
          <h2>Gender</h2>
        </div>
      );
    });
    
    this.setState({
      mappedRunners: mappedRunners
    })
  }

  render() {
    return (
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
          <div className="search-container">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.searchRunnersOrderLast();
              }}>
              <h1>Search Runners:</h1>
              <div>
                <h1>First Name:</h1>
                <input 
                  name='first_name'
                  type='text'
                  value={this.state.first_name}
                  onChange={e => this.changeHandler(e.target.name, e.target.value)}/>
                <h1>Last Name:</h1>
                <input 
                  name='last_name'
                  type='text'
                  value={this.state.last_name}
                  onChange={e => this.changeHandler(e.target.name, e.target.value)}/>
                <button>Search</button>
              </div>
            </form>
          </div>
          <div className="search-results">
            {
              this.state.mappedRunners.length
              ?
              <div>
                {this.state.mappedRunners}
              </div>
              :
              <h1>Please edit your search.</h1>
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