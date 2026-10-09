import {
  ClockIcon,
  FileIcon,
  GradientIcon,
  PasswordIcon,
  QrCodeIcon,
  TimerIcon,
  type Icon,
} from "@phosphor-icons/react";

export const navbarItems: {
  name: string;
  items: {
    label: string;
    name: string;
    icon: Icon;
    href: string;
    disabled?: boolean;
  }[];
}[] = [
  {
    name: "Design",
    items: [
      {
        label: "QR Code generator",
        name: "qr",
        icon: QrCodeIcon,
        href: "/qr-code",
      },
      {
        label: "Gradient generator",
        name: "gradient",
        icon: GradientIcon,
        href: "/gradient",
      },
    ],
  },
  {
    name: "Security",
    items: [
      {
        label: "Password generator",
        name: "password",
        icon: PasswordIcon,
        href: "/password",
      },
    ],
  },
  {
    name: "Time & Date",
    items: [
      {
        label: "Timezones",
        name: "timezone",
        icon: ClockIcon,
        href: "/timezone",
      },
      {
        label: "Unix time",
        name: "timestamp",
        icon: TimerIcon,
        href: "/timestamp",
        disabled: true,
      },
    ],
  },
  {
    name: "Files",
    items: [
      {
        label: "File converter",
        name: "file",
        icon: FileIcon,
        href: "/file-converter",
        disabled: true,
      },
    ],
  },
];

export const getNavbarItemByHref = (href: string) => {
  return navbarItems.find((navbarItem) => navbarItem.href === href);
};
