import '../styles/globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import { store } from './redux/store';
import { Provider } from 'react-redux';







function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
  <Navbar/>
 <Component {...pageProps} />
 <Footer/>
 </Provider>
  )
}

export default MyApp;
