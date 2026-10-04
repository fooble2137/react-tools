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
import { useState } from "react";
import z from "zod";
import { format } from "date-fns";
import {
  ArrowDownIcon,
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
import { labelToTimezone, timeZoneLabels } from "#/lib/timezone";

export const Route = createFileRoute("/timezone")({
  head: () => ({
    links: [
      {
        rel: "icon",
        href: "/timezone/icon.ico",
      },
    ],
  }),
  component: RouteComponent,
});

const formSchema = z.object({
  date: z
    .date("Please select a date inorder to convert the timezones")
    .min(1, "Please select a date inorder to convert the timezones"),
  time: z
    .string()
    .min(1, "Please select a time inorder to convert the timezones"),
  fromTimezone: z
    .string()
    .min(1, "Please select a timezone inorder to convert the timezones")
    .refine((value) => timeZoneLabels().includes(value), {
      message:
        "Please select a valid timezone inorder to convert the timezones",
    }),
  toTimezone: z
    .string()
    .min(1, "Please select a timezone inorder to convert the timezones")
    .refine((value) => timeZoneLabels().includes(value), {
      message:
        "Please select a valid timezone inorder to convert the timezones",
    }),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: new Date().toISOString().split("T")[1].slice(0, 5),
      fromTimezone: "",
      toTimezone: "",
    },
    validators: {
      onChange: formSchema,
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
            src="/timezone/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">Timezone converter</h1>

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
                          items={timeZoneLabels()}
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
                          items={timeZoneLabels()}
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

                    const dateTime = new Date(
                      `${format(date, "yyyy-MM-dd")}T${time}`,
                    );

                    if (isValid) {
                      const fromDateTime = new Date(
                        dateTime.toLocaleString("en-US", {
                          timeZone: labelToTimezone(fromTimezone) || "UTC",
                        }),
                      );

                      const toDateTime = new Date(
                        fromDateTime.toLocaleString("en-US", {
                          timeZone: labelToTimezone(toTimezone) || "UTC",
                        }),
                      );

                      return (
                        <>
                          <p className="text-center font-medium font-mono">
                            {format(
                              toDateTime,
                              "EEEE, MMMM dd, yyyy 'at' HH:mm",
                            )}
                          </p>

                          <FieldSeparator />

                          <div className="flex flex-col items-center text-sm text-muted-foreground gap-1">
                            <span>
                              {format(
                                fromDateTime,
                                "EEEE, MMMM dd, yyyy 'at' HH:mm",
                              )}{" "}
                              ({labelToTimezone(fromTimezone) || "UTC"})
                            </span>

                            <ArrowDownIcon className="size-3" />

                            <span>
                              {format(
                                toDateTime,
                                "EEEE, MMMM dd, yyyy 'at' HH:mm",
                              )}{" "}
                              ({labelToTimezone(toTimezone) || "UTC"})
                            </span>
                          </div>
                        </>
                      );
                    }

                    return <p></p>;
                  }}
                </form.Subscribe>
              </FieldSet>
            </FieldGroup>
          </div>
        </div>
      </main>
    </>
  );
}
