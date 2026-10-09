import { type AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputGroupAddon } from "../ui/input-group";
import { GlobeIcon } from "@phosphor-icons/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

type TimezoneSelectProps = {
  timezoneField: AnyFieldApi;
  timezoneLabels: string[];
};

const TimezoneSelect = ({
  timezoneField,
  timezoneLabels,
}: TimezoneSelectProps) => {
  const timezoneFieldIsInvalid =
    timezoneField.state.meta.isTouched && !timezoneField.state.meta.isValid;

  return (
    <Field data-invalid={timezoneFieldIsInvalid}>
      <FieldLabel htmlFor={timezoneField.name}>Target timezone</FieldLabel>

      <Combobox
        items={timezoneLabels}
        onInputValueChange={timezoneField.handleChange}
        value={timezoneField.state.value}
      >
        <ComboboxInput
          placeholder="Select a timezone"
          aria-invalid={timezoneFieldIsInvalid}
        >
          <InputGroupAddon>
            <GlobeIcon />
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>No timezones found.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {timezoneFieldIsInvalid && (
        <FieldError errors={timezoneField.state.meta.errors} />
      )}
    </Field>
  );
};

export default TimezoneSelect;
