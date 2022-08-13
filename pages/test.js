import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from './redux/slices/counterSlice';
import { addtoCart } from './redux/slices/cartSlice';
import { stringify } from 'postcss';

const test = () => {
    const count = useSelector(state=>state.counter.value);
    const cart = useSelector(state=>state.cart.cart);
    const subtotal = useSelector(state=>state.cart.subTotal);
    const dispatch = useDispatch()
    useEffect(() => {
    console.log("cart is",cart);
    console.log("subtotal is",subtotal)
    }, [])
    

   
  return (
    <div>
        <h1>total count is {count}</h1> 
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
    </div>
  )
}

export default test