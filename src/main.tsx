import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Stations from "./stations/page";
import Details from "./stations/details";
import AirQuality from "./airquality/page";

const router = createBrowserRouter([
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
    element: <AirQuality />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <main className="h-screen flex-col overflow-auto pb-8 justify-center purple-dark text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>
);
