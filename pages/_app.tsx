import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import type { AppProps } from 'next/app';
import { AppProvider } from '../context/app.context';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <ToastContainer/>
    </AppProvider>
  )
}

export default MyApp;
