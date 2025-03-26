import {configureStore} from '@reduxjs/toolkit';
import cartReducer, {loadCartData} from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.dispatch(loadCartData());
