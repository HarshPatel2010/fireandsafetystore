import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subTotal:0,
    cart:{},
    value:0,
    successStore:false
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
        if(itemcode in state.cart){
            state.cart[itemcode].qty = state.cart[itemcode].qty + action.payload.qty
        }else{
            state.cart[itemcode]={qty:1,price:price,name:name,size:size,variant:variant}
        }
        
        localStorage.setItem("cart",JSON.stringify(state.cart));
        let subT=0;
        let keys = Object.keys(state.cart)
        for (let i = 0; i < keys.length; i++) {
           subT += state.cart[keys[i]].price * state.cart[keys[i]].qty ;
        }
        state.subTotal=subT;
        state.successStore = true;
       
    },
    removeFromCart:(state,action)=>{
        const itemcode= action.payload.itemcode;
      
        if(itemcode in state.cart){
            state.cart[itemcode].qty = state.cart[itemcode].qty - action.payload.qty
        }
      if(state.cart[itemcode].qty <=0){
            delete state.cart[itemcode]
      }
      state.successStore = true;
    
    },
    addFromCart:(state,action)=>{
        const itemcode= action.payload.itemcode;
      
    
        if(itemcode in state.cart){
            state.cart[itemcode].qty = state.cart[itemcode].qty + action.payload.qty
        }
        state.successStore = true;
    },
    saveCart:(state,action)=>{
    
        localStorage.setItem("cart",JSON.stringify(action.payload));
        let subT=0;
        let keys = Object.keys(state.cart)
        for (let i = 0; i < keys.length; i++) {
           subT += state.cart[keys[i]].price * state.cart[keys[i]].qty ;
        }
        state.subTotal=subT;
     
        
        state.successStore = false
    },
    existCart:(state,action)=>{
      state.cart = action.payload
    },
    clearCart:(state)=>{
      state.cart={};
      state.subTotal=0;
      localStorage.setItem("cart",{});
     
      state.successStore = true;
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
export const { addToCart,removeFromCart,saveCart, clearCart,increment,addFromCart,existCart} = cartSlice.actions
//export const { increment, decrement, incrementByAmount } = cartSlice.actions

export default cartSlice.reducer