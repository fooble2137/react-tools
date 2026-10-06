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
import {
  ArrowsHorizontalIcon,
  ArrowsVerticalIcon,
  ImageIcon,
} from "@phosphor-icons/react";
import { type AnyFieldApi } from "@tanstack/react-form";

type ImageSettingsProps = {
  toggleField: AnyFieldApi;
  srcField: AnyFieldApi;
  widthField: AnyFieldApi;
  heightField: AnyFieldApi;
};

const ImageSettings = ({
  toggleField,
  srcField,
  widthField,
  heightField,
}: ImageSettingsProps) => {
  const srcFieldIsInvalid =
    srcField.state.meta.isTouched && !srcField.state.meta.isValid;

  const widthFieldIsInvalid =
    widthField.state.meta.isTouched && !widthField.state.meta.isValid;

  const heightFieldIsInvalid =
    heightField.state.meta.isTouched && !heightField.state.meta.isValid;

  return (
    <FieldSet className="ml-4 mr-2">
      <Field orientation="horizontal" className="mt-2">
        <FieldLabel htmlFor={toggleField.name}>Show image</FieldLabel>
        <Switch
          id={toggleField.name}
          name={toggleField.name}
          checked={toggleField.state.value}
          onCheckedChange={(checked) => toggleField.handleChange(checked)}
        />
      </Field>

      {toggleField.state.value && (
        <>
          <Field data-invalid={srcFieldIsInvalid}>
            <FieldLabel htmlFor={srcField.name}>URL</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={srcField.name}
                name={srcField.name}
                value={srcField.state.value}
                onChange={(e) => srcField.handleChange(e.target.value)}
                aria-invalid={srcFieldIsInvalid}
                placeholder="https://upload.fooble.dev/fooble/logo.png"
                autoComplete="off"
              />

              <InputGroupAddon>
                <ImageIcon />
              </InputGroupAddon>
            </InputGroup>

            {srcFieldIsInvalid && (
              <FieldError errors={srcField.state.meta.errors} />
            )}
          </Field>

          <div className="flex gap-4">
            <Field data-invalid={widthFieldIsInvalid}>
              <FieldLabel htmlFor={widthField.name}>Width</FieldLabel>
              <InputGroup className="flex-1 w-full">
                <InputGroupInput
                  id={widthField.name}
                  name={widthField.name}
                  value={widthField.state.value}
                  onChange={(e) =>
                    widthField.handleChange(Number(e.target.value))
                  }
                  aria-invalid={widthFieldIsInvalid}
                  placeholder="16"
                  autoComplete="off"
                  type="number"
                  max={64}
                  min={8}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <InputGroupAddon>
                  <ArrowsHorizontalIcon />
                </InputGroupAddon>
              </InputGroup>

              {widthFieldIsInvalid && (
                <FieldError errors={widthField.state.meta.errors} />
              )}
            </Field>

            <Field data-invalid={heightFieldIsInvalid}>
              <FieldLabel htmlFor={heightField.name}>Height</FieldLabel>
              <InputGroup className="flex-1 w-full h-fit">
                <InputGroupInput
                  id={heightField.name}
                  name={heightField.name}
                  value={heightField.state.value}
                  onChange={(e) =>
                    heightField.handleChange(Number(e.target.value))
                  }
                  aria-invalid={heightFieldIsInvalid}
                  placeholder="16"
                  autoComplete="off"
                  type="number"
                  max={64}
                  min={8}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <InputGroupAddon>
                  <ArrowsVerticalIcon />
                </InputGroupAddon>
              </InputGroup>

              {heightFieldIsInvalid && (
                <FieldError errors={heightField.state.meta.errors} />
              )}
            </Field>
          </div>
        </>
      )}
    </FieldSet>
  );
};

export default ImageSettings;
