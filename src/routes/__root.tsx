import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

import "../styles.css";
import Navbar from "../components/navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />

      <Navbar />
      <Outlet />
    </>
  );
}
