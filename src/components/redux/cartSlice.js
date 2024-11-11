import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // Shopping cart items
  wishList: [], // Wishlist items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to the cart or increment quantity if already in the cart
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push({...action.payload});
      }
    },

    // Remove item from the cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    // Increment quantity of an item in the cart
    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
    },

    // Decrement quantity or remove item if quantity is 1
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        }
      }
    },

    // Add item to wishlist if not already present
    addToWishList: (state, action) => {
      const itemIndex = state.wishList.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex === -1) {
        state.wishList.push({...action.payload});
      }
    },

    // Remove item from wishlist
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  addToWishList,
  removeFromWishList,
} = cartSlice.actions;

export default cartSlice.reducer;
