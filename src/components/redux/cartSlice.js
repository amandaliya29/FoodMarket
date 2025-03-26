import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Load data from AsyncStorage when the app starts
export const loadCartData = createAsyncThunk('cart/loadCartData', async () => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItems');
    const wishList = await AsyncStorage.getItem('wishList');
    const searchHistory = await AsyncStorage.getItem('searchHistory');

    return {
      items: cartItems ? JSON.parse(cartItems) : [],
      wishList: wishList ? JSON.parse(wishList) : [],
      searchHistory: searchHistory ? JSON.parse(searchHistory) : [],
    };
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return {items: [], wishList: [], searchHistory: []};
  }
});

const initialState = {
  items: [],
  wishList: [],
  searchHistory: [],
};

const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data:', error);
  }
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
      saveToStorage('cartItems', state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      saveToStorage('cartItems', state.items);
    },

    clearCart: state => {
      state.items = [];
      AsyncStorage.removeItem('cartItems');
    },

    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
        saveToStorage('cartItems', state.items);
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
        saveToStorage('cartItems', state.items);
      }
    },

    addToWishList: (state, action) => {
      if (!state.wishList.some(item => item.id === action.payload.id)) {
        state.wishList.push({...action.payload});
        saveToStorage('wishList', state.wishList);
      }
    },

    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        item => item.id !== action.payload.id,
      );
      saveToStorage('wishList', state.wishList);
    },

    addSearchHistory: (state, action) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory = [action.payload, ...state.searchHistory];
        saveToStorage('searchHistory', state.searchHistory);
      }
    },

    removeSearchHistoryItem: (state, action) => {
      state.searchHistory = state.searchHistory.filter(
        item => item !== action.payload,
      );
      saveToStorage('searchHistory', state.searchHistory);
    },

    clearHistory: state => {
      state.searchHistory = [];
      AsyncStorage.removeItem('searchHistory');
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCartData.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.wishList = action.payload.wishList;
      state.searchHistory = action.payload.searchHistory;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  addToWishList,
  removeFromWishList,
  addSearchHistory,
  removeSearchHistoryItem,
  clearHistory,
} = cartSlice.actions;

export default cartSlice.reducer;
