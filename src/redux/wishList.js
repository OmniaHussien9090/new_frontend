import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [], // Array of product IDs
    productsData: JSON.parse(localStorage.getItem("wishlistProducts")) || [], // Array of full product objects
  },
  reducers: {
    // Existing reducers (kept for backward compatibility)
    setWishlist: (state, action) => {
      state.items = action.payload.ids || [];
      state.productsData = action.payload.products || [];
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem("wishlistProducts", JSON.stringify(state.productsData));
    },
    
    toggleItem: (state, action) => {
      const { id, product } = action.payload;
      const index = state.items.indexOf(id);
      
      if (index !== -1) {
        state.items.splice(index, 1);
        state.productsData = state.productsData.filter(p => p._id !== id);
      } else {
        state.items.push(id);
        if (product) state.productsData.push(product);
      }
      
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem("wishlistProducts", JSON.stringify(state.productsData));
    },

    // New reducers
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.includes(product._id)) {
        state.items.push(product._id);
        state.productsData.push(product);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
        localStorage.setItem("wishlistProducts", JSON.stringify(state.productsData));
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(itemId => itemId !== id);
      state.productsData = state.productsData.filter(product => product._id !== id);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      localStorage.setItem("wishlistProducts", JSON.stringify(state.productsData));
    },

    clearWishlist: (state) => {
      state.items = [];
      state.productsData = [];
      localStorage.removeItem("wishlist");
      localStorage.removeItem("wishlistProducts");
    }
  }
});

export const { 
  setWishlist, 
  toggleItem,
  addToWishlist,
  removeFromWishlist,
  clearWishlist 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;