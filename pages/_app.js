import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </SessionProvider>
  );
};

export default MyApp;
