import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
  ArrowSquareOutIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaletteIcon,
  PhoneIcon,
  TextAaIcon,
  WifiHighIcon,
  type Icon,
} from "@phosphor-icons/react";
import { InputGroupAddon, InputGroupButton } from "../ui/input-group";

type PresetsDropdownProps = {
  changeValue: (value: string) => void;
};

const presets: {
  icon?: Icon;
  name: string;
  value: string;
}[] = [
  { icon: ArrowSquareOutIcon, name: "URL", value: "https://fooble.dev" },
  { icon: TextAaIcon, name: "Text", value: "Hello world!" },
  { icon: PhoneIcon, name: "Phone", value: "tel:+493023125000" },
  { icon: EnvelopeIcon, name: "Email", value: "mailto:contact@fooble.dev" },
  {
    icon: WifiHighIcon,
    name: "Wi-Fi",
    value: "WIFI:T:WPA;S:MyNetwork;P:mypassword;;",
  },
  { icon: MapPinIcon, name: "Location", value: "geo:37.334606,-122.009102" },
];

const PresetsDropdown = ({ changeValue }: PresetsDropdownProps) => {
  return (
    <InputGroupAddon align="inline-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <InputGroupButton variant="ghost" aria-label="More" size="icon-xs">
              <PaletteIcon />
            </InputGroupButton>
          }
        />
        <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Presets</DropdownMenuLabel>

            {presets.map((preset) => (
              <DropdownMenuItem
                key={preset.name}
                onClick={() => changeValue(preset.value)}
              >
                {preset.icon && <preset.icon />}
                {preset.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </InputGroupAddon>
  );
};

export default PresetsDropdown;
