import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  return (
    
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <img  className="mx-auto  h-12 w-auto" src="/images/tailwind-logo.svg" alt="Workflow"/>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
      <Link href = {"/signup"}>
          <a  className="font-medium text-pink-600 hover:text-pink-500"> SignUp</a>
          </Link>
      </p>
    </div>
    <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Password"/>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"/>
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div className="text-sm">
         <Link href={"/forgot"} >
          <a className="font-medium text-pink-600 hover:text-pink-500">Forgot your password?</a>
          </Link>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
 
            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
   
  )
}

export default Login