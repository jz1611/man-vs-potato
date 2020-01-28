import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
// import Loading from '../Loading/Loading';

// Stripe Integratioin
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm'

// CSS
import './Cart.css';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      mappedItems: [],
      total: 0.00
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    let total = 0;
    const mappedItems = this.props.cart.map((storeItem, index) => {
      const { item } = storeItem;
      total = total + item.price * storeItem.quantity;
      return (
        <div
          key={index}
          className="cart-item-bar">
          <img
            src={item.img_url}
            alt={item.img_alt_text}
            className="cart-image item-bar-object" />
          <h1 className="item-bar-object">{item.item_name}</h1>
          <h2 className="item-bar-object">${item.price}</h2>
          <h2 className="item-bar-object">X {storeItem.quantity}</h2>
        </div>
      );
    });

    this.setState({
      mappedItems: mappedItems,
      total: total
    })
  }

  render() {
    return (
      <div className="cart-page">
        {
          this.state.mappedItems.length
          ?
          <div className="cart-page">
            <h1 className="page-title">Cart</h1>
            <div className="cart-items">
              {this.state.mappedItems}
            </div>
            <div className="cart-summary">
              <h1 className="total">Total: ${this.state.total}</h1>
            </div>
            <StripeProvider apiKey="pk_test_vqyhulipkB1xHeRjuPlcHE6r00yZJ1zR6p">
              <div>
                <h1>Checkout:</h1>
                <Elements>
                  <CheckoutForm price={this.state.total}/>
                </Elements>
              </div>
            </StripeProvider>
          </div>
          :
          <h1 className="page-title">The cart is empty!</h1>
        }
      </div>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapReduxStateToProps)(Cart);