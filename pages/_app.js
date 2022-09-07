import React, { useState,useEffect } from 'react'
import '../styles/globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router';







function MyApp({ Component, pageProps }) {
 const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    });
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    });
  }, [])
  
  return (
    <Provider store={store}>
         <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar/>
 <Component {...pageProps} />
 <Footer/>
 </Provider>
  )
}

export default MyApp;
