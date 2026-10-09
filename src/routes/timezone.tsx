import { Button } from "#/components/ui/button";
import { FieldGroup, FieldSet } from "#/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import z from "zod";
import { format } from "date-fns";
import {
  ArrowDownIcon,
  ArrowsDownUpIcon,
  DotsThreeOutlineIcon,
  SunHorizonIcon,
} from "@phosphor-icons/react";
import {
  getTimezoneLabels,
  getTimezones,
  labelToTimezone,
} from "#/lib/timezone";
import { generateHeadMeta } from "#/lib/head";
import {
  formatInTimeZone,
  fromZonedTime,
  getTimezoneOffset,
} from "date-fns-tz";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { Separator } from "#/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import { ButtonGroup } from "#/components/ui/button-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#/components/ui/collapsible";
import TimeSettings from "#/components/timezone/time";
import TimezoneSelect from "#/components/timezone/timezone";

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
  const timezones = useMemo(getTimezones, []);
  const timezoneLabels = useMemo(
    () => getTimezoneLabels(timezones),
    [timezones],
  );

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: format(new Date(), "HH:mm"),
      fromTimezone: "Europe/Berlin (UTC+01:00)",
      toTimezone: "America/New_York (UTC-05:00)",
    },
    validators: {
      onChange: createFormSchema(timezoneLabels),
    },
  });

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <div className="mr-2 flex">
            <Separator orientation="vertical" className="h-4" />
          </div>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink render={<Link to="/" />}>Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                Time & Date
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Timezone converter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0 timezone">
        <div className="mx-auto max-w-4xl w-full">
          <img
            src="/assets/timezone/text.png"
            className="h-16 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
            alt="Timezone converter"
          />
          <h1 className="sr-only">Timezone converter</h1>

          <FieldGroup className="w-full">
            <Accordion className="gap-2" defaultValue={["timezones"]} multiple>
              <AccordionItem value="date">
                <AccordionTrigger>Time & Date</AccordionTrigger>

                <AccordionContent className="pb-4">
                  <FieldSet className="ml-4 mr-2">
                    <form.Field
                      name="date"
                      children={(dateField) => (
                        <form.Field
                          name="time"
                          children={(timeField) => (
                            <TimeSettings
                              dateField={dateField}
                              timeField={timeField}
                            />
                          )}
                        />
                      )}
                    />
                  </FieldSet>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timezones">
                <AccordionTrigger>Timezones</AccordionTrigger>

                <AccordionContent className="pb-4">
                  <FieldSet className="ml-4 mr-2 flex-row">
                    <form.Field
                      name="fromTimezone"
                      children={(field) => (
                        <TimezoneSelect
                          timezoneField={field}
                          timezoneLabels={timezoneLabels}
                        />
                      )}
                    />

                    <form.Field
                      name="toTimezone"
                      children={(field) => (
                        <TimezoneSelect
                          timezoneField={field}
                          timezoneLabels={timezoneLabels}
                        />
                      )}
                    />
                  </FieldSet>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Alert>
              <SunHorizonIcon />
              <AlertTitle>Daylight saving time</AlertTitle>
              <AlertDescription>
                Converting time zones does not take daylight saving time into
                account. If daylight saving time is in effect in either time
                zone, you may need to adjust the time manually.
              </AlertDescription>
            </Alert>

            <form.Subscribe
              selector={(state) => ({
                values: state.values,
                isValid: state.isValid,
              })}
            >
              {({ values, isValid }) => {
                const { date, time, fromTimezone, toTimezone } = values;
                const sourceTimezone = labelToTimezone(fromTimezone, timezones);
                const targetTimezone = labelToTimezone(toTimezone, timezones);
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
                      <Collapsible className="mt-4">
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-center text-xl font-mono">
                            {conversion.target}
                          </p>

                          <CollapsibleTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Show conversion details"
                              >
                                <DotsThreeOutlineIcon />
                              </Button>
                            }
                          />
                        </div>

                        <CollapsibleContent className="flex flex-col items-center text-sm text-muted-foreground gap-1 mt-2">
                          <span>
                            {conversion.source} ({sourceTimezone})
                          </span>

                          <ArrowDownIcon className="size-3" />

                          <span>
                            {conversion.target} ({targetTimezone})
                          </span>
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  );
                }
              }}
            </form.Subscribe>

            <ButtonGroup>
              <ButtonGroup>
                <Button
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
              </ButtonGroup>
            </ButtonGroup>
          </FieldGroup>
        </div>
      </div>
    </>
  );
}
