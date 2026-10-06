import {
  ColorPicker,
  ColorPickerHue,
  ColorPickerSelection,
} from "#/components/kibo-ui/color-picker";
import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { type AnyFieldApi } from "@tanstack/react-form";

type FinderPatternsSettingsProps = {
  colorField: AnyFieldApi;
  styleField: AnyFieldApi;
  styles: { label: string; value: string }[];
};

const FinderPatternsSettings = ({
  colorField,
  styleField,
  styles,
}: FinderPatternsSettingsProps) => {
  const colorFieldIsInvalid =
    colorField.state.meta.isTouched && !colorField.state.meta.isValid;

  const styleFieldIsInvalid =
    styleField.state.meta.isTouched && !styleField.state.meta.isValid;

  return (
    <FieldSet className="ml-4 mr-2">
      <div className="flex gap-4">
        <Popover>
          <Field data-invalid={colorFieldIsInvalid}>
            <FieldLabel htmlFor={colorField.name}>Color</FieldLabel>
            <PopoverTrigger>
              <InputGroup className="flex-1 w-full">
                <InputGroupInput
                  id={colorField.name}
                  name={colorField.name}
                  value={colorField.state.value}
                  onBlur={colorField.handleBlur}
                  onChange={(e) => colorField.handleChange(e.target.value)}
                  aria-invalid={colorFieldIsInvalid}
                  placeholder="#ffffff"
                  autoComplete="off"
                  readOnly
                />

                <InputGroupAddon>
                  <div
                    className="size-4 rounded-sm border border-border"
                    style={{
                      backgroundColor: colorField.state.value,
                    }}
                  />
                </InputGroupAddon>
              </InputGroup>
            </PopoverTrigger>

            <PopoverContent className="w-64" align="start">
              <ColorPicker
                defaultValue="#3b82f6"
                onChange={(value) => colorField.handleChange(value)}
                value={colorField.state.value}
              >
                <ColorPickerSelection className="h-36" />

                <ColorPickerHue />
              </ColorPicker>
            </PopoverContent>

            {colorFieldIsInvalid && (
              <FieldError errors={colorField.state.meta.errors} />
            )}
          </Field>
        </Popover>

        <Field data-invalid={styleFieldIsInvalid}>
          <FieldLabel htmlFor={styleField.name}>Style</FieldLabel>

          <Select
            name={styleField.name}
            value={styleField.state.value}
            onValueChange={(value) => styleField.handleChange(value)}
            items={styles.map((style) => ({
              label: style.label,
              value: style.value,
            }))}
          >
            <SelectTrigger
              id={styleField.name}
              className="flex-1 w-full"
              aria-invalid={styleFieldIsInvalid}
            >
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {styles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {styleFieldIsInvalid && (
            <FieldError errors={styleField.state.meta.errors} />
          )}
        </Field>
      </div>
    </FieldSet>
  );
};

export default FinderPatternsSettings;
