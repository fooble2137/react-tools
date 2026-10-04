import { navbarItems } from "#/data/navbar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const randomNavbarItem =
    navbarItems[Math.floor(Math.random() * navbarItems.length)];

  return (
    <>
      <style>
        {`body {
          background-color: ${randomNavbarItem.color};
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        <Link
          to="/qr-code"
          className="shadow-md rounded-md hover:scale-105 transition-transform"
        >
          <img src="/qr/bg.png" alt="QR Code generator" />
        </Link>

        <Link
          to="/gradient"
          className="shadow-md rounded-md hover:scale-105 transition-transform"
        >
          <img src="/gradient/bg.png" alt="Gradient generator" />
        </Link>

        <Link
          to="/password"
          className="shadow-md rounded-md hover:scale-105 transition-transform"
        >
          <img src="/password/bg.png" alt="Password generator" />
        </Link>

        <Link
          to="/timezone"
          className="shadow-md rounded-md hover:scale-105 transition-transform"
        >
          <img src="/timezone/bg.png" alt="Timezone converter" />
        </Link>

        <div className="shadow-md rounded-md relative cursor-not-allowed">
          <img
            src="/file-converter/bg.png"
            alt="File converter"
            className="opacity-75"
          />

          <p className="text-center text-white font-semibold text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Not available yet
          </p>
        </div>
      </main>
    </>
  );
}
