import {
  BarcodeIcon,
  ClockIcon,
  GradientIcon,
  HashIcon,
  PasswordIcon,
  QrCodeIcon,
  type Icon,
} from "@phosphor-icons/react";

export const navbarItems: {
  label: string;
  icon: Icon;
  href: string;
  color: string;
}[] = [
  {
    label: "QR Code",
    icon: QrCodeIcon,
    href: "/qr-code",
    color: "#39A95C",
  },
  {
    label: "Barcode",
    icon: BarcodeIcon,
    href: "/barcode",
    color: "#39A95C",
  },
  {
    label: "Gradient",
    icon: GradientIcon,
    href: "/gradient",
    color: "#39A95C",
  },
  {
    label: "Password",
    icon: PasswordIcon,
    href: "/password",
    color: "#39A95C",
  },
  {
    label: "Timezone",
    icon: ClockIcon,
    href: "/timezone",
    color: "#39A95C",
  },
  {
    label: "Roman",
    icon: HashIcon,
    href: "/roman-numerals",
    color: "#39A95C",
  },
];

export const getNavbarItemByHref = (href: string) => {
  return navbarItems.find((navbarItem) => navbarItem.href === href);
};
