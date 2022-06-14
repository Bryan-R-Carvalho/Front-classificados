import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";
import { OpenProvider } from "../context/OpenContext";
import { ToastProvider } from "../context/ToastContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <SearchProvider>
          <OpenProvider>
            <Component {...pageProps} />
          </OpenProvider>
        </SearchProvider>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;
