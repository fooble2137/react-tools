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

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        <Link to="/qr-code" className="shadow-md rounded-md">
          <img src="/qr/bg.png" alt="QR Code generator" />
        </Link>

        <Link to="/barcode" className="shadow-md rounded-md">
          <img src="/barcode/bg.png" alt="Barcode generator" />
        </Link>

        <Link to="/gradient" className="shadow-md rounded-md">
          <img src="/gradient/bg.png" alt="Gradient generator" />
        </Link>

        <Link to="/password" className="shadow-md rounded-md">
          <img src="/password/bg.png" alt="Password generator" />
        </Link>

        <Link to="/timezone" className="shadow-md rounded-md">
          <img src="/timezone/bg.png" alt="Timezone converter" />
        </Link>

        <Link to="/roman-numerals" className="shadow-md rounded-md">
          <img src="/roman/bg.png" alt="Roman numerals converter" />
        </Link>
      </main>
    </>
  );
}
