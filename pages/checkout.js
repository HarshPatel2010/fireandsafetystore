import Link from "next/link";
import { useEffect } from "react";
import {
  addFromCart,
  removeFromCart,
  saveCart,
} from "./redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";


const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const successStore = useSelector((state) => state.cart.successStore);
  const dispatch = useDispatch();

  const initiatePayment = async () => {
 
    let oid = Math.floor(Math.random()*Date.now())

    //Get a transaction token
    const data = { cart, subTotal,oid,email:"harshpatel2901@gmail.com" };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let txnToken = await a.json();
    console.log(b)
    
      
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId":oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });

  }

  

useEffect(() => {
  if (successStore === true) {
    dispatch(saveCart(cart));

  }
}, [successStore]);
return (
  <div className="container px-2 sm:m-auto">
    <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  crossorigin="anonymous"></Script>
    <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
    <h2 className="text-xl  font-bold">1. Delivery Details</h2>
    <div className="mx-auto flex my-4">
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="name"
            className="leading-7 text-sm text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="email"
            className="leading-7 text-sm text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
    <div className="px-2 w-full">
      <div className=" mb-4">
        <label
          htmlFor="address"
          className="leading-7 text-sm text-gray-600"
        >
          Address
        </label>
        <textarea
          name="address"
          id="address"
          cols="10"
          rows="2"
          type="text"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
    </div>
    <div className="mx-auto flex my-4">
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="phone"
            className="leading-7 text-sm text-gray-600"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="city"
            className="leading-7 text-sm text-gray-600"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
    <div className="mx-auto flex my-4">
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="state"
            className="leading-7 text-sm text-gray-600"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="px-2 w-1/2">
        <div className=" mb-4">
          <label
            htmlFor="pincode"
            className="leading-7 text-sm text-gray-600"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </div>
    <h2 className="text-xl  font-bold">2. Review Cart Items</h2>
    <div className="sideCart   bg-pink-100 py-5 px-10 my-2">
      <h2 className="font-bold text-xl text-center"> Review Cart Items</h2>
      <span className="absolute top-5 right-2 text-2xl cursor-pointer text-pink-500"></span>
      <ol className="list-decimal font-semibold">
        {Object.keys(cart).length === 0 && (
          <div className="my-4 text-base font-normal">Your cart is Empty</div>
        )}
        {Object.keys(cart).map((item) => {

          return (
            <li key={item}>
              <div className="item flex my-5">
                <div className=" font-semibold text-sm">
                  {cart[item].name}
                </div>
                <div className="w-1/3 flex justify-center font-semibold items-center text-xm">
                  <span className="mx-2">
                    <AiFillMinusCircle
                      onClick={() =>
                        dispatch(removeFromCart({ itemcode: item, qty: 1 }))
                      }
                      className="cursor-pointer text-pink-500 text-xm "
                    />
                  </span>
                  {cart[item].qty}
                  <span className="mx-2">
                    <AiFillPlusCircle
                      onClick={() =>
                        dispatch(addFromCart({ itemcode: item, qty: 1 }))
                      }
                      className="cursor-pointer text-pink-500 text-xm  "
                    />
                  </span>
                </div>
              </div>
            </li>

          );

        })}
        <span >Subtotal: ₹{subTotal}</span>
      </ol>
      <div className="mt-2">
        <Link href={"/checkout"}>
          <button onClick={initiatePayment} className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className="m-0.5" />Pay ₹
            {subTotal}</button>
        </Link>
      </div>

    </div>
  </div>
);
};

export default Checkout;
