import { type AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { ButtonGroup } from "../ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { format } from "date-fns-tz";
import { CalendarDotsIcon, ClockIcon } from "@phosphor-icons/react";
import { Calendar } from "../ui/calendar";

type TimeSettingsProps = {
  dateField: AnyFieldApi;
  timeField: AnyFieldApi;
};

const TimeSettings = ({ dateField, timeField }: TimeSettingsProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const dateFieldIsInvalid =
    dateField.state.meta.isTouched && !dateField.state.meta.isValid;

  const timeFieldIsInvalid =
    timeField.state.meta.isTouched && !timeField.state.meta.isValid;

  return (
    <Field>
      <FieldLabel htmlFor={dateField.name}>
        Time in starting timezone
      </FieldLabel>

      <ButtonGroup>
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger
            render={<InputGroup className="min-w-32" />}
            nativeButton={false}
          >
            <InputGroupInput
              id={dateField.name}
              name={dateField.name}
              value={
                dateField.state.value
                  ? format(dateField.state.value, "PPP")
                  : ""
              }
              aria-invalid={dateFieldIsInvalid}
              placeholder="Select date"
              autoComplete="off"
              readOnly
            />

            <InputGroupAddon>
              <CalendarDotsIcon />
            </InputGroupAddon>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateField.state.value}
              defaultMonth={dateField.state.value}
              onSelect={(date) => {
                dateField.setValue(date || new Date());
                setDatePickerOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <InputGroup className="max-w-24">
          <InputGroupInput
            id={timeField.name}
            name={timeField.name}
            value={timeField.state.value}
            onChange={(e) => timeField.handleChange(e.target.value)}
            aria-invalid={timeFieldIsInvalid}
            placeholder="Select time"
            autoComplete="off"
            type="time"
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />

          <InputGroupAddon>
            <ClockIcon />
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>

      {dateFieldIsInvalid && (
        <FieldError errors={dateField.state.meta.errors} />
      )}

      {timeFieldIsInvalid && (
        <FieldError errors={timeField.state.meta.errors} />
      )}
    </Field>
  );
};

export default TimeSettings;
