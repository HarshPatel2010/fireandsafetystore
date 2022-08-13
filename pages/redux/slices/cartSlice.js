import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subTotal:0,
    cart:{}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action)=>{
        const name = action.payload.name;
        const price = action.payload.price;
        const qty = action.payload.qty;
        const itemcode= action.payload.itemcode
        const variant = action.payload.variant;
        const size = action.payload.itemcode
        if(itemcode in cart){
            state.cart[itemcode].qty = state.cart[itemcode].qty + action.payload.qty
        }else{
            state.cart[itemcode]={qty:1,price:price,name:name,size:size,variant:variant}
        }
    },
    removeFromCart:(state,action)=>{
  
        const itemcode= action.payload.itemcode;
        if(itemcode in cart){
            state.cart[itemcode].qty = state.cart[itemcode].qty - action.payload.qty
        }
      if(state.cart[itemcode]["qty"] <=0){
            delete state.cart[itemcode]
      }
    },
    saveCart:(state)=>{
        localStorage.setItem("cart",state.cart);
    },
    clearCart:(state)=>{
      state.cart={};
      state.subTotal=0;
      localStorage.setItem("cart",{});
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoCart,removeFromCart,saveCart, clearCart} = cartSlice.actions
//export const { increment, decrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer