import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import {
  BsFillBagCheckFill
} from "react-icons/bs";

const Navbar = () => {
  const ref = useRef(null);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col  justify-center items-center md:flex-row md:justify-start mb-1 py-2 shadow-md ">
      <div className="logo ">
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            alt={"Logo of Dolphin"}
            width={150}
            height={70}
          ></Image>
        </Link>
      </div>
      <div className="nav ">
        <ul className="flex items-center space-x-6 font-bold ">
          <Link href={"/panels"}>
            <a>
              {" "}
              <li>Panels</li>
            </a>
          </Link>
          <Link href={"/sprinklers"}>
            <a>
              {" "}
              <li>Sprinklers</li>
            </a>
          </Link>
          <Link href={"/hydrants"}>
            <a>
              {" "}
              <li>Hydrant</li>
            </a>
          </Link>
          <Link href={"/extingushers"}>
            <a>
              {" "}
              <li>Extingushers</li>
            </a>
          </Link>
        </ul>
      </div>
      <div
        onClick={toggleCart}
        className="cart absolute right-0 mx-5 cursor-pointer "
      >
        <AiOutlineShoppingCart className="text-xl md:text-2xl " />
      </div>

      <div
        ref={ref}
        className=" w-72 h-full sideCart absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform translate-x-full "
      >
        <h2 className="font-bold text-xl text-center"> shopping cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-2xl cursor-pointer text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold text-sm">
                Fire store, consists products that saves your life
              </div>
              <div className="w-1/3 flex justify-center font-semibold items-center text-xm">
                <span className="mx-2">
                  <AiFillMinusCircle className="cursor-pointer text-pink-500 text-xm " />
                </span>
                1
                <span className="mx-2">
                  <AiFillPlusCircle className="cursor-pointer text-pink-500 text-xm  " />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold text-sm">
                Fire store, consists products that saves your life
              </div>
              <div className="w-1/3 flex justify-center font-semibold items-center text-xm">
                <span className="mx-2">
                  <AiFillMinusCircle className="cursor-pointer text-pink-500 text-xm " />
                </span>
                1
                <span className="mx-2">
                  <AiFillPlusCircle className="cursor-pointer text-pink-500 text-xm  " />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold text-sm">
                Fire store, consists products that saves your life
              </div>
              <div className="w-1/3 flex justify-center font-semibold items-center text-xm">
                <span className="mx-2">
                  <AiFillMinusCircle className="cursor-pointer text-pink-500 text-xm " />
                </span>
                1
                <span className="mx-2">
                  <AiFillPlusCircle className="cursor-pointer text-pink-500 text-xm  " />
                </span>
              </div>
            </div>
          </li>
        </ol>
      <div className="flex">
      <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className="m-0.5"/>Checkout</button>
      <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
      </div>
      </div>
    </div>
  );
};

// export default Navbar;
