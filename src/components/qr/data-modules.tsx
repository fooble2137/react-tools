import {
  ColorPicker,
  ColorPickerHue,
  ColorPickerSelection,
} from "#/components/kibo-ui/color-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "#/components/ui/field";
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
import { Switch } from "#/components/ui/switch";
import { type AnyFieldApi } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { dataModuelsStyles, getDataModulesStyleByValue } from "#/lib/qr";
import { Slider } from "#/components/ui/slider";

type BackgroundSettingsProps = {
  colorField: AnyFieldApi;
  styleField: AnyFieldApi;
  randomSizeField: AnyFieldApi;
  sizeField: AnyFieldApi;
  lineWidthField: AnyFieldApi;
};

const DataModulesSettings = ({
  colorField,
  styleField,
  randomSizeField,
  sizeField,
  lineWidthField,
}: BackgroundSettingsProps) => {
  const colorFieldIsInvalid =
    colorField.state.meta.isTouched && !colorField.state.meta.isValid;

  const styleFieldIsInvalid =
    styleField.state.meta.isTouched && !styleField.state.meta.isValid;

  const sizeFieldIsInvalid =
    sizeField.state.meta.isTouched && !sizeField.state.meta.isValid;

  const lineWidthFieldIsInvalid =
    lineWidthField.state.meta.isTouched && !lineWidthField.state.meta.isValid;

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
                defaultValue="#000000"
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
            items={dataModuelsStyles.map((style) => ({
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
                {dataModuelsStyles.map((style) => (
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

      {styleField.state.value &&
        getDataModulesStyleByValue(styleField.state.value) &&
        getDataModulesStyleByValue(styleField.state.value)!.variableSize && (
          <Field orientation="horizontal" className="mt-2">
            <FieldLabel htmlFor={randomSizeField.name}>Random size</FieldLabel>
            <Switch
              id={randomSizeField.name}
              name={randomSizeField.name}
              checked={randomSizeField.state.value}
              onCheckedChange={(checked) =>
                randomSizeField.handleChange(checked)
              }
            />
          </Field>
        )}

      {styleField.state.value &&
        getDataModulesStyleByValue(styleField.state.value) &&
        getDataModulesStyleByValue(styleField.state.value)!.variableSize &&
        !randomSizeField.state.value && (
          <Field data-invalid={sizeFieldIsInvalid} orientation="horizontal">
            <FieldLabel htmlFor={sizeField.name}>Size</FieldLabel>

            <Slider
              id={sizeField.name}
              name={sizeField.name}
              value={sizeField.state.value}
              onValueChange={(value) => sizeField.handleChange(value)}
              aria-invalid={sizeFieldIsInvalid}
              max={1}
              min={0.75}
              step={0.01}
            />

            <FieldDescription className="w-16 text-right">
              {sizeField.state.value}
            </FieldDescription>
          </Field>
        )}

      {styleField.state.value &&
        getDataModulesStyleByValue(styleField.state.value) &&
        getDataModulesStyleByValue(styleField.state.value)!.variableLineWidth &&
        !randomSizeField.state.value && (
          <Field
            data-invalid={lineWidthFieldIsInvalid}
            orientation="horizontal"
          >
            <FieldLabel htmlFor={lineWidthField.name} className="text-nowrap">
              Line width
            </FieldLabel>

            <Slider
              id={lineWidthField.name}
              name={lineWidthField.name}
              value={lineWidthField.state.value}
              onValueChange={(value) => lineWidthField.handleChange(value)}
              aria-invalid={lineWidthFieldIsInvalid}
              max={1}
              min={0.25}
              step={0.01}
            />

            <FieldDescription className="w-16 text-right">
              {lineWidthField.state.value}
            </FieldDescription>
          </Field>
        )}
    </FieldSet>
  );
};

export default DataModulesSettings;
