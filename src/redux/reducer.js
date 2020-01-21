const initialState = {
  user: null,
  cart: []
}

const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_TO_CART = 'ADD_TO_CART';

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: action.payload
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    payload: user,
    type: SET_USER
  }
}

export function logoutUser() {
  return {
    payload: null,
    type: LOGOUT_USER
  }
}

export function addToCart(item, quantity) {
  return {
    payload: {item, quantity},
    type: ADD_TO_CART
  }
}