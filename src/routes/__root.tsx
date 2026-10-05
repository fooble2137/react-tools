import {
  HeadContent,
  Navigate,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";

import "../styles.css";
import Navbar from "../components/navbar";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "og:site_name",
        content: "tools.fooble.dev",
      },
      {
        name: "og:locale",
        content: "en_GB",
      },
      {
        name: "twitter:image",
        content: "/fooble/bg.png",
      },
      {
        name: "og:image",
        content: "/fooble/bg.png",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      {
        name: "author",
        content: "Fooble",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/fooble/icon.ico",
      },
    ],
  }),
  notFoundComponent: () => <Navigate to="/" replace />,
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
