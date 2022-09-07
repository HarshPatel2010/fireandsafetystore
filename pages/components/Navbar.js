import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { addFromCart, addToCart, clearCart, existCart, removeFromCart, saveCart } from "../redux/slices/cartSlice";
import { useRouter } from "next/router";


const Navbar = () => {
  const ref = useRef(null);
  const router = useRouter()
  const cart = useSelector(state => state.cart.cart);
  const successStore = useSelector(state => state.cart.successStore);
  const subTotal = useSelector(state => state.cart.subTotal)
  const dispatch = useDispatch();

  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0);
  const [dropDown, setdropDown] = useState(false)

  const logout = () => {
    localStorage.removeItem("token");
    setKey(Math.random());
    setUser({ value: null })
    router.push("/")
  }

  useEffect(() => {
    if (successStore === true) {
      dispatch(saveCart(cart));

    }
  }, [successStore])

  useEffect(() => {


    try {
      if (localStorage.getItem("cart")) {
        let cartdetail = {}
        let localvalue = JSON.parse(localStorage.getItem("cart"));

        for (let item in localvalue) {

          cartdetail[item] = {
            itemcode: item,
            name: localvalue[item].name,
            price: localvalue[item].price,
            qty: localvalue[item].qty,
            size: localvalue[item].size,
            variant: localvalue[item].variant
          }
        }

        dispatch(existCart(cartdetail));
        dispatch(saveCart(cartdetail));


        // dispatch(addToCart(JSON.parse(localStorage.getItem("cart"))))
      }
    } catch (error) {

      localStorage.clear()
    }
  }, [])

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({ value: localStorage.getItem("token") })
      setKey(Math.random())
    }
  }, [router.query]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({ value: localStorage.getItem("token") })
      setKey(Math.random())
    }
  }, []);
  return (
    <div className="sticky top-0 bg-white z-10 shadow-2xl " >
      <header className="text-gray-600 body-font   ">
        <div className="container mx-auto my-0 flex flex-wrap px-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Link href={"/"}>
              <Image
                src={"/images/logo.png"}
                alt={"Logo of Dolphin"}
                width={150}
                height={70}
              ></Image>
            </Link>
            {/* <span className="ml-3 text-xl">DolphinFire</span> */}
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <div className="nav ">
              <ul className="flex items-center space-x-6 font-bold ">
                <Link href={"/panels"}>
                  <a>

                    <li className="hover:text-pink-600">Panels</li>
                  </a>
                </Link>
                <Link href={"/sprinklers"}>
                  <a>

                    <li className="hover:text-pink-600">Sprinklers</li>
                  </a>
                </Link>
                <Link href={"/hydrants"}>
                  <a>

                    <li className="hover:text-pink-600">Hydrant</li>
                  </a>
                </Link>
                <Link href={"/extingushers"}>
                  <a>

                    <li className="hover:text-pink-600">Extingushers</li>
                  </a>
                </Link>
              </ul>
            </div>
          </nav>
          <div
            className="cart absolute right-0 mx-5 cursor-pointer flex top-5 items-center "
          >
            <span onMouseOver={() => { setdropDown(true) }} onMouseLeave={() => { setdropDown(false) }} >
              {dropDown && <div onMouseOver={() => { setdropDown(true) }} onMouseLeave={() => { setdropDown(false) }} className="absolute right-6 top-6 bg-white shadow-lg px-5 py-1 rounded-md w-40 text-sm">
                <ul>
                  <Link href={"/myaccount"}><li className="py-1 hover:text-pink-700 text-sm font-bold">My Account</li></Link>
                  <Link href={"/orders"}><li className="py-1 hover:text-pink-700 text-sm font-bold">Orders</li></Link>
                  <li onClick={logout} className="py-1 hover:text-pink-700 text-sm font-bold">Logout</li>
                </ul>
              </div>}
              {user.value &&
                <MdAccountCircle className="text-xl mx-2 md:text-2xl" />
              }
            </span>

            {!user.value && <Link href={"/login"}><a>
              <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
            </a></Link>}
            <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl " />
          </div>

          <div
            ref={ref}
            className=" w-72 h-[100vh]  sideCart absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform translate-x-full "
          >
            <h2 className="font-bold text-xl text-center"> shopping cart</h2>
            <span
              onClick={toggleCart}
              className="absolute top-5 right-2 text-2xl cursor-pointer text-pink-500"
            >
              <AiFillCloseCircle />
            </span>
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length === 0 && <div className="my-4 text-base font-normal">Your cart is Empty</div>
              }
              {Object.keys(cart).map((item) => {
                return <li key={item}>

                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold text-sm">
                      {cart[item].name}({cart[item].size}/{cart[item].variant})
                    </div>
                    <div className="w-1/3 flex justify-center font-semibold items-center text-xm">
                      <span className="mx-2">
                        <AiFillMinusCircle onClick={() => dispatch(removeFromCart({ itemcode: item, qty: 1 }))} className="cursor-pointer text-pink-500 text-xm " />
                      </span>
                      {cart[item].qty}
                      <span className="mx-2">
                        <AiFillPlusCircle onClick={() => dispatch(addFromCart({ itemcode: item, qty: 1 }))} className="cursor-pointer text-pink-500 text-xm  " />
                      </span>
                    </div>
                  </div>
                </li>
              })}

            </ol>
            <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
            <div className="flex">
              <Link href={"/checkout"}>
                <a>
                  <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className="m-0.5" />Checkout</button></a>
              </Link>
              <button onClick={() => dispatch(clearCart())} className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
