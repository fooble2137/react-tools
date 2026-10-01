import { dataModuelsStyles } from "#/lib/qr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DataModulesStyleSelectProps = {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
};

const DataModulesStyleSelect = ({
  name,
  value,
  onValueChange,
}: DataModulesStyleSelectProps) => {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => onValueChange(value!)}
      items={dataModuelsStyles.map((style) => ({
        label: style.label,
        value: style.value,
      }))}
    >
      <SelectTrigger id={name}>
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {dataModuelsStyles.map((style) => (
            <SelectItem key={style.value} value={style.value}>
              {style.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DataModulesStyleSelect;
