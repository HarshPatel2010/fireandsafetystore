import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { addToCart, increment, saveCart, clearCart } from "../redux/slices/cartSlice";
import mongoose from 'mongoose';
import Product from "../../models/Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ variants, product, checkv }) => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  const subTotal = useSelector(state => state.cart.subTotal)
  // defines the States

  const [service, setservice] = useState(null);
  const [pin, setpin] = useState(null);
  const [selectedItemInfo, setselectedItemInfo] = useState({
    itemcode: "panel",
    name: "Fire panel",
    price: 499,
    qty: 1,
    size: "Xl",
    variant: "red"
  });
  const [color, setcolor] = useState(product.color);
  const [size, setsize] = useState(product.size)
  const addToCartFunction = () => {
    const currentproduct = {
      itemcode: slug,
      name: product.title,
      price: product.price,
      qty: 1,
      size: product.size,
      variant: product.color,
      img: product.img
    }
    dispatch(addToCart(currentproduct));
  }

  const handleChange = (e) => {
    setpin(e.target.value);

  }
  const checkserviceability = async () => {
  

    let allPincodes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let allPincodesJson = await allPincodes.json();
    if (allPincodesJson.includes(parseInt(pin))) {
      setservice(true);
      toast.success('🦄 Pincode is Servicable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      setservice(false);
      toast.error('🦄 Sorry!, Pincode is not Servicable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

  }
  const refreshVariants = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
  }
  const buyNow = () => {
    dispatch(clearCart());
    addToCartFunction();
    router.push("/checkout")
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="flex justify-center">
              {/* <Image  
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 md:h-64 md:px-0 object-cover object-top rounded"
              src={product.img}
              height={300}
              width={300}
            /> */}
              <img alt="ecommerce" className=" w-full lg:h-auto h-64 object-cover object-center rounded" src={product.img}></img>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Fire Store
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}({product.size}/{product.color})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                {/* <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
              </div>
              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {Object.keys(variants).includes("red") && <button onClick={() => { refreshVariants(size, "red") }} className={`border-2  ${color === "red" ? "border-black" : "border-gray-300"}  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("yellow") && <button onClick={() => { refreshVariants(size, "yellow") }} className={`border-2  ${color === "yellow" ? "border-black" : "border-gray-300"}  ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("green") && <button onClick={() => { refreshVariants(size, "green") }} className={`border-2  ${color === "green" ? "border-black" : "border-gray-300"}  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("blue") && <button onClick={() => { refreshVariants(size, "blue") }} className={`border-2  ${color === "blue" ? "border-black" : "border-gray-300"}  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("white") && <button onClick={() => { refreshVariants(size, "white") }} className={`border-2  ${color === "white" ? "border-black" : "border-gray-300"}  ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none`}></button>}


                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariants(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {Object.keys(variants[color]).map((item) => {
                        return <option key={item}>{item}</option>

                      })}

                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button onClick={() => { buyNow() }} className="flex ml-10 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Buy&nbsp;Now
                </button>
                <button onClick={addToCartFunction} className="flex ml-5 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Add&nbsp;to&nbsp;cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 ">
                <input onChange={handleChange} type="text" className="px-2 border-2 text-sm border-pink-500 rounded-md" placeholder="Enter your pincode " />
                <button onClick={checkserviceability} className=" text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" >Check</button>
              </div>
              {(service && service != null) && <div className="text-green-700 text-sm mt-3">
                This pincode is serviable
              </div>}
              {(!service && service != null) && <div className="text-red-700 text-sm mt-3">
                This pincode is not serviable
              </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  //check connection from  mongoose
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title,category:product.category });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: { variants: JSON.parse(JSON.stringify(colorSizeSlug)), product: JSON.parse(JSON.stringify(product)), checkv: JSON.parse(JSON.stringify(variants)) }, // will be passed to the page component as props
  }
}

export default Slug;
