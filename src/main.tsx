import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import AppRouter from "./routes/AppRouter.tsx";

import "@mantine/core/styles.css";
import "./styles/global.css";

function MainApp() {
  return (
      <MantineProvider >
        <AppRouter />
      </MantineProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
