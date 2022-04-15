import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";
import { ToastProvider } from "../context/ToastContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;
