export const randomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

export const directions = [
  {
    label: "To right",
    value: "to right",
  },
  {
    label: "To left",
    value: "to left",
  },
  {
    label: "To bottom",
    value: "to bottom",
  },
  {
    label: "To top",
    value: "to top",
  },
  {
    label: "To bottom right",
    value: "to bottom right",
  },
  {
    label: "To bottom left",
    value: "to bottom left",
  },
  {
    label: "To top right",
    value: "to top right",
  },
  {
    label: "To top left",
    value: "to top left",
  },
  {
    label: "Custom angle",
    value: "custom",
  },
];
