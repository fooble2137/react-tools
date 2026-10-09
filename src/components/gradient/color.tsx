import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "#/components/ui/input-group";
import { type AnyFieldApi } from "@tanstack/react-form";
import { MapPinSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { ButtonGroup } from "../ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ColorPicker,
  ColorPickerHue,
  ColorPickerSelection,
} from "../kibo-ui/color-picker";
import { Button } from "../ui/button";

type ColorStopProps = {
  colorField: AnyFieldApi;
  positionField: AnyFieldApi;
  stopsField: AnyFieldApi;
  index: number;
  canBeRemoved?: boolean;
};

const ColorStop = ({
  colorField,
  positionField,
  stopsField,
  index,
  canBeRemoved,
}: ColorStopProps) => {
  const colorFieldIsInvalid =
    colorField.state.meta.isTouched && !colorField.state.meta.isValid;

  const positionFieldIsInvalid =
    positionField.state.meta.isTouched && !positionField.state.meta.isValid;

  return (
    <Field aria-invalid={colorFieldIsInvalid || positionFieldIsInvalid}>
      <FieldLabel htmlFor={`gradient-color-${index}`} className="sr-only">
        Color {index + 1}
      </FieldLabel>

      <ButtonGroup>
        <Popover>
          <PopoverTrigger render={<InputGroup className="min-w-32" />}>
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
        </Popover>

        <InputGroup className="max-w-24">
          <InputGroupInput
            id={positionField.name}
            name={positionField.name}
            value={positionField.state.value}
            onChange={(e) => positionField.handleChange(Number(e.target.value))}
            aria-invalid={positionFieldIsInvalid}
            placeholder="50"
            autoComplete="off"
            type="number"
            max={100}
            min={0}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <InputGroupAddon>
            <MapPinSimpleIcon />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end">
            <InputGroupText>%</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <Button
          variant="outline"
          size="icon"
          onClick={() => stopsField.removeValue(index)}
          disabled={!canBeRemoved}
        >
          <TrashIcon />
        </Button>
      </ButtonGroup>

      {colorFieldIsInvalid && (
        <FieldError errors={colorField.state.meta.errors} />
      )}
      {positionFieldIsInvalid && (
        <FieldError errors={positionField.state.meta.errors} />
      )}
    </Field>
  );
};

export default ColorStop;
