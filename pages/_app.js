import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/SearchContext";
import { SidebarProvider } from "../context/SidebarContext";
import { ToastProvider } from "../context/ToastContext";
import { EditProvider } from "../context/EditProviderContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <SearchProvider>
          <SidebarProvider>
            <EditProvider>
              <Component {...pageProps} />
            </EditProvider>
          </SidebarProvider>
        </SearchProvider>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;
