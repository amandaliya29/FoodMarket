import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  wishList: [],
  searchHistory: [],
  orders: [],
  pastOrders: [], // Added to keep track of canceled orders
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }
    },

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

    addToWishList: (state, action) => {
      const itemIndex = state.wishList.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex === -1) {
        state.wishList.push({...action.payload});
      }
    },

    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        item => item.id !== action.payload.id,
      );
    },

    addSearchHistory: (state, action) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory = [action.payload, ...state.searchHistory];
      }
    },

    removeSearchHistoryItem: (state, action) => {
      state.searchHistory = state.searchHistory.filter(
        item => item !== action.payload,
      );
    },

    clearHistory: state => {
      state.searchHistory = [];
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    clearOrders: state => {
      state.orders = [];
    },

    clearCart: state => {
      state.items = [];
    },

    cancelOrder: (state, action) => {
      const orderIndex = state.orders.findIndex(
        order => order.id === action.payload.id,
      );
      if (orderIndex >= 0) {
        const canceledOrder = state.orders.splice(orderIndex, 1)[0]; // Remove the order from orders
        state.pastOrders.push(canceledOrder); // Optionally push to past orders
      }
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
  addSearchHistory,
  removeSearchHistoryItem,
  clearHistory,
  addOrder,
  clearOrders,
  clearCart,
  cancelOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
