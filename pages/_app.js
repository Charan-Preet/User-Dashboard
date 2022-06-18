import "../styles/globals.css";
import tachyons from "tachyons";
import { DataContextProvider } from "../context";
import Navbar from "../reuseables/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DataContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </DataContextProvider>
    </>
  );
}

export default MyApp;
