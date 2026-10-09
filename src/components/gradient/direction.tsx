import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "#/components/ui/input-group";
import { type AnyFieldApi } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { directions } from "#/lib/gradient";
import { AngleIcon } from "@phosphor-icons/react";

type DirectionSettingsProps = {
  directionField: AnyFieldApi;
  angleField: AnyFieldApi;
};

const DirectionSettings = ({
  directionField,
  angleField,
}: DirectionSettingsProps) => {
  const directionFieldIsInvalid =
    directionField.state.meta.isTouched && !directionField.state.meta.isValid;

  const angleFieldIsInvalid =
    angleField.state.meta.isTouched && !angleField.state.meta.isValid;

  return (
    <FieldSet className="ml-4 mr-2">
      <Field data-invalid={directionFieldIsInvalid}>
        <FieldLabel htmlFor={directionField.name}>Direction preset</FieldLabel>

        <Select
          name={directionField.name}
          value={directionField.state.value}
          onValueChange={(value) => directionField.handleChange(value)}
          items={directions.map((direction) => ({
            label: direction.label,
            value: direction.value,
          }))}
        >
          <SelectTrigger
            id={directionField.name}
            className="flex-1 w-full"
            aria-invalid={directionFieldIsInvalid}
          >
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {directions.map((direction) => (
                <SelectItem key={direction.value} value={direction.value}>
                  {direction.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {directionFieldIsInvalid && (
          <FieldError errors={directionField.state.meta.errors} />
        )}
      </Field>

      {directionField.state.value === "custom" && (
        <Field data-invalid={angleFieldIsInvalid}>
          <FieldLabel htmlFor={angleField.name}>Custom angle</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id={angleField.name}
              name={angleField.name}
              value={angleField.state.value}
              onChange={(e) => angleField.handleChange(Number(e.target.value))}
              aria-invalid={angleFieldIsInvalid}
              placeholder="16"
              autoComplete="off"
              type="number"
              max={360}
              min={0}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <InputGroupAddon>
              <AngleIcon />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end">
              <InputGroupText>deg</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {angleFieldIsInvalid && (
            <FieldError errors={angleField.state.meta.errors} />
          )}
        </Field>
      )}
    </FieldSet>
  );
};

export default DirectionSettings;
