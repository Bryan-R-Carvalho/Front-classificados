import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";
import { SidebarProvider } from "../context/SidebarContext";
import { ToastProvider } from "../context/ToastContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <SearchProvider>
          <SidebarProvider>
            <Component {...pageProps} />
          </SidebarProvider>
        </SearchProvider>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;
