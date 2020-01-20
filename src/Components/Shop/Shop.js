// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import {} from '../../redux/reducer';
import Loading from '../Loading/Loading';

// CSS
import './Shop.css';

class Shop extends React.Component {
  render() {
    return (
      <div>
        Shop
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  // setUser
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Shop);