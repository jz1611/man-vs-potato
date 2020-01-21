// Dependencies
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/reducer';
import Loading from '../Loading/Loading';

// CSS
import './Shop.css';


class Shop extends React.Component {
  constructor() {
    super();

    this.state = {
      mappedItems: [],
      loading: true
    };
  }

  componentDidMount = async () => {
    this.getAllItems();
    this.setState({
      loading: false
    });
  }

  getAllItems = async () => {
    const items = await axios.get('/api/get_items').catch(err => console.log(err));
    const mappedItems = items.data.map(item => {
      return (
        this.state.loading
        ?
        <div className="results-loading">
          <Loading type={'bubbles'} color={'rgb(77, 194, 248)'} height={250} width={350}/>
        </div>
        :
        <div
          key={item.item_id}
          className="item-container">
          <img
            src={item.img_url}
            alt={item.img_alt_text}
            className="shop-image" />
          <h1>{item.item_name}</h1>
          <h2>${item.price}</h2>
          <button
            className="cart-button"
            onClick={e => {
              this.props.addToCart(item, 1);
            }}>Add To Cart</button>
        </div>
      );
    });

    this.setState({
      mappedItems: mappedItems
    })
  }

  render() {
    return (
      <div className="shop">
        <div className="item-grid">
          {this.state.mappedItems}
        </div>
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  addToCart
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Shop);