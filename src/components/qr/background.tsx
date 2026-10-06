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
import { Switch } from "#/components/ui/switch";
import { type AnyFieldApi } from "@tanstack/react-form";

type BackgroundSettingsProps = {
  transparentField: AnyFieldApi;
  colorField: AnyFieldApi;
};

const BackgroundSettings = ({
  transparentField,
  colorField,
}: BackgroundSettingsProps) => {
  const colorFieldIsInvalid =
    colorField.state.meta.isTouched && !colorField.state.meta.isValid;

  return (
    <FieldSet className="ml-4 mr-2">
      <Field orientation="horizontal" className="mt-2">
        <FieldLabel htmlFor={transparentField.name}>Transparent</FieldLabel>
        <Switch
          id={transparentField.name}
          name={transparentField.name}
          checked={transparentField.state.value}
          onCheckedChange={(checked) => transparentField.handleChange(checked)}
        />
      </Field>

      {!transparentField.state.value && (
        <Popover>
          <Field data-invalid={colorFieldIsInvalid} orientation="horizontal">
            <FieldLabel htmlFor={colorField.name}>Color</FieldLabel>
            <PopoverTrigger>
              <InputGroup className="max-w-32">
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
      )}
    </FieldSet>
  );
};

export default BackgroundSettings;
