import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import OwnerContextProvider from "./context/OwnerContext.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <OwnerContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OwnerContextProvider>
    </BrowserRouter>
  </StrictMode>
);

// Identifying Unsafe Lifecycle: It helps identify components with unsafe lifecycle methods.
// Warning About Legacy String Refs: It warns about the usage of string refs.
// Detecting Unexpected Side Effects: It detects unexpected side effects.
// Detecting Legacy Context API: It warns if the legacy context API is used.
