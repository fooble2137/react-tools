import { finderPatternInnerStyles } from "#/lib/qr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FinderPatternInnerStyleSelectProps = {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
};

const FinderPatternInnerStyleSelect = ({
  name,
  value,
  onValueChange,
}: FinderPatternInnerStyleSelectProps) => {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => onValueChange(value!)}
      items={finderPatternInnerStyles.map((style) => ({
        label: style.label,
        value: style.value,
      }))}
    >
      <SelectTrigger id={name}>
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {finderPatternInnerStyles.map((style) => (
            <SelectItem key={style.value} value={style.value}>
              {style.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FinderPatternInnerStyleSelect;
