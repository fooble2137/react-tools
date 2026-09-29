import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/roman-numerals")({
  head: () => ({
    links: [
      {
        rel: "icon",
        href: "/roman/icon.ico",
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

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden timezone">
        <div className="bg-gray-100 mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full">
          <img
            src="/roman/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">Timezone converter</h1>
        </div>
      </main>
    </>
  );
}
