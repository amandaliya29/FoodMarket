import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  wishList: [],
  searchHistory: [],
  orders: [],
  pastOrders: [], // Added to keep track of past orders
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
        // Update the order status to 'canceled'
        state.orders[orderIndex].status = 'canceled';

        // Remove the order from orders
        const canceledOrder = state.orders.splice(orderIndex, 1)[0];

        // Push the updated canceled order to pastOrders
        state.pastOrders.push(canceledOrder);
      }
    },

    // New action to move order to past orders after a delay
    moveOrderToPast: (state, action) => {
      const orderIndex = state.orders.findIndex(
        order => order.id === action.payload.id,
      );
      if (orderIndex >= 0) {
        const movedOrder = state.orders.splice(orderIndex, 1)[0]; // Remove the order from orders
        state.pastOrders.push(movedOrder); // Push to past orders
        // Optionally, remove from 'items' if the order was in progress
        state.items = state.items.filter(item => item.id !== action.payload.id);
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
  moveOrderToPast, // Export the moveOrderToPast action
} = cartSlice.actions;

export default cartSlice.reducer;
