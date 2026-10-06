import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  TextAaIcon,
  WifiHighIcon,
  type Icon,
} from "@phosphor-icons/react";

export const dataModuelsStyles: {
  value: string;
  label: string;
  variableSize?: boolean;
  variableLineWidth?: boolean;
}[] = [
  {
    value: "circle",
    label: "Circle",
    variableSize: true,
  },
  {
    value: "circuit-board",
    label: "Circuit Board",
    variableLineWidth: true,
  },
  {
    value: "diamond",
    label: "Diamond",
    variableSize: true,
  },
  {
    value: "hashtag",
    label: "Hashtag",
    variableSize: true,
  },
  {
    value: "heart",
    label: "Heart",
    variableSize: true,
  },
  {
    value: "horizontal-line",
    label: "Horizontal line",
    variableLineWidth: true,
  },
  {
    value: "leaf",
    label: "Leaf",
  },
  {
    value: "pinched-square",
    label: "Pinched square",
    variableSize: true,
  },
  {
    value: "rounded",
    label: "Rounded",
    variableLineWidth: true,
  },
  {
    value: "square",
    label: "Square",
    variableSize: true,
  },
  {
    value: "square-sm",
    label: "Square small",
  },
  {
    value: "star",
    label: "Star",
    variableSize: true,
  },
  {
    value: "vertical-line",
    label: "Vertical line",
    variableLineWidth: true,
  },
];

export const getDataModulesStyleByValue = (value: string) => {
  return dataModuelsStyles.find((style) => style.value === value);
};

export const finderPatternOuterStyles: {
  value: string;
  label: string;
}[] = [
  {
    value: "circle",
    label: "Circle",
  },
  {
    value: "inpoint",
    label: "Inpoint",
  },
  {
    value: "inpoint-lg",
    label: "Inpoint large",
  },
  {
    value: "inpoint-sm",
    label: "Inpoint small",
  },
  {
    value: "leaf",
    label: "Leaf",
  },
  {
    value: "leaf-lg",
    label: "Leaf large",
  },
  {
    value: "leaf-sm",
    label: "Leaf small",
  },
  {
    value: "outpoint",
    label: "Outpoint",
  },
  {
    value: "outpoint-lg",
    label: "Outpoint large",
  },
  {
    value: "outpoint-sm",
    label: "Outpoint small",
  },
  {
    value: "pinched-square",
    label: "Pinched square",
  },
  {
    value: "rounded",
    label: "Rounded",
  },
  {
    value: "rounded-lg",
    label: "Rounded large",
  },
  {
    value: "rounded-sm",
    label: "Rounded small",
  },
  {
    value: "square",
    label: "Square",
  },
];

export const finderPatternInnerStyles: {
  value: string;
  label: string;
}[] = [
  {
    value: "circle",
    label: "Circle",
  },
  {
    value: "diamond",
    label: "Diamond",
  },
  {
    value: "hashtag",
    label: "Hashtag",
  },
  {
    value: "heart",
    label: "Heart",
  },
  {
    value: "inpoint",
    label: "Inpoint",
  },
  {
    value: "inpoint-lg",
    label: "Inpoint large",
  },
  {
    value: "inpoint-sm",
    label: "Inpoint small",
  },
  {
    value: "leaf",
    label: "Leaf",
  },
  {
    value: "leaf-lg",
    label: "Leaf large",
  },
  {
    value: "leaf-sm",
    label: "Leaf small",
  },
  {
    value: "microchip",
    label: "Microchip",
  },
  {
    value: "outpoint",
    label: "Outpoint",
  },
  {
    value: "outpoint-lg",
    label: "Outpoint large",
  },
  {
    value: "outpoint-sm",
    label: "Outpoint small",
  },
  {
    value: "pinched-square",
    label: "Pinched square",
  },
  {
    value: "rounded",
    label: "Rounded",
  },
  {
    value: "rounded-lg",
    label: "Rounded large",
  },
  {
    value: "rounded-sm",
    label: "Rounded small",
  },
  {
    value: "square",
    label: "Square",
  },
  {
    value: "star",
    label: "Star",
  },
];

export const presets: {
  name: string;
  label: string;
  defaultValue: string;
}[] = [
  {
    name: "text",
    label: "URL & Text",
    defaultValue: "https://fooble.dev",
  },
  {
    name: "phone",
    label: "Phone",
    defaultValue: "tel:+493023125000",
  },
  {
    name: "email",
    label: "Email",
    defaultValue: "mailto:contact@fooble.dev",
  },
  {
    name: "wifi",
    label: "Wi-Fi",
    defaultValue: "WIFI:T:WPA;S:MyNetwork;P:mypassword;;",
  },
  {
    name: "location",
    label: "Location",
    defaultValue: "geo:37.334606,-122.009102",
  },
];
