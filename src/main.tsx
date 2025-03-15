import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <main className="w-screen h-screen flex-col justify-center purple-dark text-foreground bg-background">
        <App />
      </main>
    </HeroUIProvider>
  </StrictMode>
);
