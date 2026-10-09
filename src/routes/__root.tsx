import "../styles.css";

import {
  HeadContent,
  Navigate,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { TooltipProvider } from "#/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import AppSidebar from "#/components/sidebar";
import { ThemeProvider } from "#/components/theme-provider";

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
        content: "/assets/fooble/bg.png",
      },
      {
        name: "og:image",
        content: "/assets/fooble/bg.png",
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
        href: "/assets/fooble/icon.ico",
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

      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar variant="inset" collapsible="offcanvas" />
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}
