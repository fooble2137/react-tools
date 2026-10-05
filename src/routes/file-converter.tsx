import { generateHeadMeta } from "#/lib/head";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/file-converter")({
  head: () => ({
    meta: generateHeadMeta({
      title: "File converter - fooble.dev Tools",
      description: "A lightweight collection of browser-based utilities.",
      url: "https://tools.fooble.dev/file-converter",
      isPublic: false,
      type: "website",
      keywords: ["Fooble"],
      bgPath: "/assets/file-converter/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/file-converter/icon.ico",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <style>
        {`body {
          background-color: #b83e40;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden file">
        <div className="bg-gray-100 mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full">
          <img
            src="/assets/file-converter/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">File converter</h1>
        </div>
      </main>
    </>
  );
}
