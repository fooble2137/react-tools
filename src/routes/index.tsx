import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "#/components/ui/breadcrumb";
import { Separator } from "#/components/ui/separator";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { generateHeadMeta } from "#/lib/head";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: generateHeadMeta({
      title: "fooble.dev Tools",
      description: "A lightweight collection of browser-based utilities.",
      url: "https://tools.fooble.dev",
      isPublic: false,
      type: "website",
      keywords: [
        "tools",
        "utilities",
        "qr code",
        "gradient",
        "password",
        "timezone",
        "Fooble",
      ],
      bgPath: "/assets/fooble/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/fooble/icon.ico",
      },
    ],
  }),
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <div className="mr-2 flex">
            <Separator orientation="vertical" className="h-4" />
          </div>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Tools</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0">
        <div className="mx-auto max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link
            to="/qr-code"
            className="shadow-md rounded-md hover:scale-105 transition-transform"
          >
            <img
              src="/assets/qr/bg.png"
              alt="QR Code generator"
              aria-label="QR Code generator"
            />
          </Link>

          <Link
            to="/gradient"
            className="shadow-md rounded-md hover:scale-105 transition-transform"
          >
            <img
              src="/assets/gradient/bg.png"
              alt="Gradient generator"
              aria-label="Gradient generator"
            />
          </Link>

          <Link
            to="/password"
            className="shadow-md rounded-md hover:scale-105 transition-transform"
          >
            <img
              src="/assets/password/bg.png"
              alt="Password generator"
              aria-label="Password generator"
            />
          </Link>

          <Link
            to="/timezone"
            className="shadow-md rounded-md hover:scale-105 transition-transform"
          >
            <img
              src="/assets/timezone/bg.png"
              alt="Timezone converter"
              aria-label="Timezone converter"
            />
          </Link>

          <div className="shadow-md rounded-md relative cursor-not-allowed">
            <img
              src="/assets/file-converter/bg.png"
              alt="File converter"
              className="opacity-30"
              aria-label="File converter"
            />

            <p className="text-center text-white font-semibold text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
