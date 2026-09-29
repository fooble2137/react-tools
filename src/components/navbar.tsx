import { getNavbarItemByHref, navbarItems } from "#/data/navbar";
import { cn } from "#/lib/cn";
import { CompassIcon, XCircleIcon } from "@phosphor-icons/react";
import { useLocation } from "@tanstack/react-router";
import { useState } from "react";

const Navbar = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-100 p-2 md:flex hidden gap-x-4 items-center justify-center shadow-md">
        {navbarItems.map((navbarItem) => (
          <NavbarItem
            key={navbarItem.href}
            isActive={navbarItem.href === pathname}
            {...navbarItem}
          />
        ))}
      </nav>

      <button
        className="flex md:hidden items-center p-2 rounded-md transition-colors duration-200 text-white shadow-sm fixed top-2 right-2 z-50"
        onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
        style={{
          backgroundColor: getNavbarItemByHref(pathname)
            ? getNavbarItemByHref(pathname)?.color
            : undefined,
        }}
      >
        {mobileNavbarOpen ? (
          <XCircleIcon
            className="size-5"
            aria-label="Close mobile navigation"
          />
        ) : (
          <CompassIcon className="size-5" aria-label="Open mobile navigation" />
        )}
      </button>

      {mobileNavbarOpen && (
        <nav className="bg-gray-100 p-2 flex md:hidden flex-col gap-y-2 items-center justify-center shadow-md fixed top-15 right-0 w-fit rounded-l-md">
          {navbarItems.map((navbarItem) => (
            <NavbarItem
              key={navbarItem.href}
              isActive={navbarItem.href === pathname}
              className="w-full"
              {...navbarItem}
            />
          ))}
        </nav>
      )}
    </>
  );
};

type NavbarItemProps = {
  label: string;
  icon: React.ElementType;
  href: string;
  color: string;
  isActive?: boolean;
  className?: string;
};

const NavbarItem = ({
  label,
  icon: Icon,
  href,
  color,
  isActive,
  className,
}: NavbarItemProps) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center justify-center gap-x-2 p-2 rounded-md transition-colors duration-200 text-sm",
        isActive ? "text-white shadow-sm" : "hover:bg-gray-200 text-gray-900",
        className,
      )}
      style={{
        backgroundColor: isActive ? color : undefined,
      }}
    >
      <Icon
        className="size-5"
        weight={isActive ? "duotone" : "regular"}
        aria-hidden="true"
      />
      {label}
    </a>
  );
};

export default Navbar;
