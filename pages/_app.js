// ? Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'

// ? Ant CSS
import 'antd/dist/antd.css';

// ? Own CSS
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  // ! Return the APP
  return (<Component {...pageProps} />)
}

export default MyApp
