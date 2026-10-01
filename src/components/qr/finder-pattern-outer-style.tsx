import { finderPatternOuterStyles } from "#/lib/qr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FinderPatternOuterStyleSelectProps = {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
};

const FinderPatternOuterStyleSelect = ({
  name,
  value,
  onValueChange,
}: FinderPatternOuterStyleSelectProps) => {
  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => onValueChange(value!)}
      items={finderPatternOuterStyles.map((style) => ({
        label: style.label,
        value: style.value,
      }))}
    >
      <SelectTrigger id={name}>
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {finderPatternOuterStyles.map((style) => (
            <SelectItem key={style.value} value={style.value}>
              {style.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FinderPatternOuterStyleSelect;
