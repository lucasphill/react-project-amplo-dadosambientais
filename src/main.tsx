import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
// import App from "./App.tsx";
import Stations from "./stations/page";
import Details from "./stations/details";
import Logs from "./airquality/page";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "/",
    element: <Stations />,
  },
  {
    path: "/Station",
    element: <Details />,
  },
  {
    path: "/Logs/Station",
    element: <Logs />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <main className="h-screen flex-col justify-center purple-dark text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>
);
