import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import MainLayout from "../components/Layout/MainLayout";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </MainLayout>
  );
}

export default MyApp;
