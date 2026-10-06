import { Button } from "#/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "#/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import z from "zod";
import { format } from "date-fns";
import {
  ArrowDownIcon,
  ArrowsDownUpIcon,
  CaretDownIcon,
  ClockIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { Calendar } from "#/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "#/components/ui/combobox";
import {
  getTimezoneLabels,
  getTimezonesFromCSV,
  labelToTimezone,
  type Timezone,
} from "#/lib/timezone";
import { generateHeadMeta } from "#/lib/head";
import {
  formatInTimeZone,
  fromZonedTime,
  getTimezoneOffset,
} from "date-fns-tz";

export const Route = createFileRoute("/timezone")({
  head: () => ({
    meta: generateHeadMeta({
      title: "Timezone converter - fooble.dev Tools",
      description: "Convert a given date and time to different time zones.",
      url: "https://tools.fooble.dev/timezone",
      isPublic: true,
      type: "website",
      keywords: ["timezone", "converter", "time", "date", "Fooble"],
      bgPath: "/assets/timezone/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/timezone/icon.ico",
      },
    ],
  }),
  component: TimezoneConverterRoute,
});

const createFormSchema = (timezoneLabels: string[]) =>
  z.object({
    date: z
      .date("Please select a date inorder to convert the timezones")
      .min(1, "Please select a date inorder to convert the timezones"),
    time: z
      .string()
      .regex(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Please select a valid time inorder to convert the timezones",
      ),
    fromTimezone: z
      .string()
      .min(1, "Please select a timezone inorder to convert the timezones")
      .refine((value) => timezoneLabels.includes(value), {
        message:
          "Please select a valid timezone inorder to convert the timezones",
      }),
    toTimezone: z
      .string()
      .min(1, "Please select a timezone inorder to convert the timezones")
      .refine((value) => timezoneLabels.includes(value), {
        message:
          "Please select a valid timezone inorder to convert the timezones",
      }),
  });

const convertedDateTimeFormat = "EEEE, MMMM dd, yyyy 'at' HH:mm";

const convertDateTime = (
  date: Date,
  time: string,
  fromTimezone: string,
  toTimezone: string,
) => {
  const instant = fromZonedTime(
    `${format(date, "yyyy-MM-dd")}T${time}:00`,
    fromTimezone,
  );
  const sourceOffset = getTimezoneOffset(fromTimezone, instant);
  const targetOffset = getTimezoneOffset(toTimezone, instant);
  const source = formatInTimeZone(
    instant,
    fromTimezone,
    convertedDateTimeFormat,
  );

  return {
    source,
    target:
      sourceOffset === targetOffset
        ? source
        : formatInTimeZone(instant, toTimezone, convertedDateTimeFormat),
  };
};

function TimezoneConverterRoute() {
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [timezoneError, setTimezoneError] = useState<string | null>(null);
  const timezoneLabels = useMemo(
    () => getTimezoneLabels(timezones),
    [timezones],
  );

  useEffect(() => {
    getTimezonesFromCSV()
      .then(setTimezones)
      .catch((error: unknown) => {
        setTimezoneError(
          error instanceof Error
            ? error.message
            : "Unable to load timezone list",
        );
      });
  }, []);

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: format(new Date(), "HH:mm"),
      fromTimezone:
        "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna (UTC+02:00)",
      toTimezone: "Eastern Time US and Canada (UTC-04:00)",
    },
    validators: {
      onChange: createFormSchema(timezoneLabels),
    },
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <>
      <style>
        {`body {
          background-color: #0f766e;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden timezone">
        <div className="bg-background mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full md:mb-10 mb-0">
          <img
            src="/assets/timezone/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">Timezone converter</h1>
          {timezoneError && (
            <p className="mb-4 text-center text-sm text-destructive">
              {timezoneError}
            </p>
          )}

          <div className="sm:min-w-md">
            <FieldGroup className="w-full">
              <FieldSet className="flex-row">
                <form.Field
                  name="date"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                        <Popover
                          open={datePickerOpen}
                          onOpenChange={setDatePickerOpen}
                        >
                          <PopoverTrigger
                            render={
                              <Button
                                variant="outline"
                                id="date-picker-optional"
                                className="w-32 justify-between font-normal"
                              >
                                {field.state.value
                                  ? format(field.state.value, "PPP")
                                  : "Select date"}
                                <CaretDownIcon data-icon="inline-end" />
                              </Button>
                            }
                          />
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              startMonth={new Date(1900, 0)}
                              endMonth={new Date(2100, 0)}
                              mode="single"
                              selected={field.state.value}
                              captionLayout="dropdown"
                              defaultMonth={field.state.value}
                              onSelect={(date) => {
                                field.setValue(date || new Date());
                                setDatePickerOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="time"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Time</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Select time"
                            autoComplete="off"
                            type="time"
                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />

                          <InputGroupAddon>
                            <ClockIcon />
                          </InputGroupAddon>
                        </InputGroup>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <form.Field
                  name="fromTimezone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          From timezone
                        </FieldLabel>
                        <Combobox
                          items={timezoneLabels}
                          onInputValueChange={field.handleChange}
                          value={field.state.value}
                        >
                          <ComboboxInput placeholder="Select a timezone">
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

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="toTimezone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          To timezone
                        </FieldLabel>
                        <Combobox
                          items={timezoneLabels}
                          onInputValueChange={field.handleChange}
                          value={field.state.value}
                        >
                          <ComboboxInput placeholder="Select a timezone">
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

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <FieldSeparator />

                <form.Subscribe
                  selector={(state) => ({
                    values: state.values,
                    isValid: state.isValid,
                  })}
                >
                  {({ values, isValid }) => {
                    const { date, time, fromTimezone, toTimezone } = values;
                    const sourceTimezone = labelToTimezone(
                      fromTimezone,
                      timezones,
                    );
                    const targetTimezone = labelToTimezone(
                      toTimezone,
                      timezones,
                    );
                    const conversion =
                      isValid && sourceTimezone && targetTimezone
                        ? convertDateTime(
                            date,
                            time,
                            sourceTimezone,
                            targetTimezone,
                          )
                        : null;

                    if (conversion && sourceTimezone && targetTimezone) {
                      return (
                        <>
                          <p className="text-center font-medium font-mono">
                            {conversion.target}
                          </p>
                          <FieldSeparator />
                          <div className="flex flex-col items-center text-sm text-muted-foreground gap-1">
                            <span>
                              {conversion.source} ({sourceTimezone})
                            </span>

                            <ArrowDownIcon className="size-3" />

                            <span>
                              {conversion.target} ({targetTimezone})
                            </span>
                          </div>
                        </>
                      );
                    }
                  }}
                </form.Subscribe>

                <Button
                  size="lg"
                  className="w-fit mx-auto"
                  onClick={() => {
                    const fromTimezone = form.getFieldValue("fromTimezone");
                    const toTimezone = form.getFieldValue("toTimezone");

                    form.setFieldValue("fromTimezone", toTimezone);
                    form.setFieldValue("toTimezone", fromTimezone);
                  }}
                >
                  <ArrowsDownUpIcon />
                  Switch timezones
                </Button>
              </FieldSet>
            </FieldGroup>
          </div>
        </div>
      </main>
    </>
  );
}
