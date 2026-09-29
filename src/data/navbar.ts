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
    color: "#39a95c",
  },
  {
    label: "Barcode",
    icon: BarcodeIcon,
    href: "/barcode",
    color: "#9b235b",
  },
  {
    label: "Gradient",
    icon: GradientIcon,
    href: "/gradient",
    color: "#8e3dff",
  },
  {
    label: "Password",
    icon: PasswordIcon,
    href: "/password",
    color: "#109bff",
  },
  {
    label: "Timezone",
    icon: ClockIcon,
    href: "/timezone",
    color: "#0f766e",
  },
  {
    label: "Roman",
    icon: HashIcon,
    href: "/roman-numerals",
    color: "#b83e40",
  },
];

export const getNavbarItemByHref = (href: string) => {
  return navbarItems.find((navbarItem) => navbarItem.href === href);
};
