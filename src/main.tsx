import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter.tsx";
import { Provider } from 'react-redux'
import { store } from './Store/index.ts'

import "@mantine/core/styles.css";
import "./styles/global.css";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function MainApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);