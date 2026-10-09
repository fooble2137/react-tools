import ColorStop from "#/components/gradient/color";
import DirectionSettings from "#/components/gradient/direction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { Button } from "#/components/ui/button";
import { ButtonGroup } from "#/components/ui/button-group";
import { Field, FieldGroup, FieldSet } from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "#/components/ui/input-group";
import { Separator } from "#/components/ui/separator";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { randomHexColor } from "#/lib/gradient";
import { generateHeadMeta } from "#/lib/head";
import {
  CopyIcon,
  PaletteIcon,
  PlusIcon,
  ShuffleIcon,
} from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "cn";
import z from "zod";

export const Route = createFileRoute("/gradient")({
  head: () => ({
    meta: generateHeadMeta({
      title: "Gradient generator - fooble.dev Tools",
      description:
        "Create CSS-ready gradients for backgrounds, cards, landing pages and UI themes.",
      url: "https://tools.fooble.dev/gradient",
      isPublic: true,
      type: "website",
      keywords: [
        "gradient",
        "css gradient",
        "linear gradient",
        "radial gradient",
        "gradient generator",
        "Fooble",
      ],
      bgPath: "/assets/gradient/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/gradient/icon.ico",
      },
    ],
  }),
  component: GradientGeneratorRoute,
});

const formSchema = z.object({
  direction: z.string().min(1, "Direction is required"),
  degree: z
    .number()
    .min(0, "Degree must be at least 0")
    .max(360, "Degree must be at most 360"),
  stops: z
    .array(
      z.object({
        id: z.number(),
        color: z
          .string()
          .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color"),
        stop: z
          .number()
          .min(0, "Stop must be at least 0")
          .max(100, "Stop must be at most 100"),
      }),
    )
    .min(2, "At least two color stops are required"),
});

function GradientGeneratorRoute() {
  const form = useForm({
    defaultValues: {
      direction: "to right",
      degree: 90,
      stops: [
        { id: 1, color: "#8E3DFF", stop: 0 },
        { id: 2, color: "#FF3D8E", stop: 100 },
      ],
    },
    validators: {
      onChange: formSchema,
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
                Design
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Gradient generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0 gradient">
        <div className="mx-auto max-w-4xl w-full">
          <img
            src="/assets/gradient/text.png"
            className="h-16 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
            alt="Gradient generator"
          />
          <h1 className="sr-only">Gradient generator</h1>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              <FieldGroup className="flex-1">
                <Accordion
                  className="gap-2"
                  defaultValue={["direction", "colors"]}
                  multiple
                >
                  <AccordionItem value="direction">
                    <AccordionTrigger>Direction</AccordionTrigger>

                    <AccordionContent className="pb-4">
                      <form.Field name="direction">
                        {(directionField) => (
                          <form.Field name="degree">
                            {(angleField) => (
                              <DirectionSettings
                                directionField={directionField}
                                angleField={angleField}
                              />
                            )}
                          </form.Field>
                        )}
                      </form.Field>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colors">
                    <AccordionTrigger>Colors</AccordionTrigger>

                    <AccordionContent className="pb-4">
                      <FieldSet className="ml-4 mr-2">
                        <form.Field name="stops" mode="array">
                          {(stopsField) => (
                            <>
                              {stopsField.state.value.map((stop, index) => (
                                <form.Field name={`stops[${index}].color`}>
                                  {(field) => (
                                    <form.Field name={`stops[${index}].stop`}>
                                      {(positionField) => (
                                        <ColorStop
                                          key={stop.id}
                                          colorField={field}
                                          positionField={positionField}
                                          stopsField={stopsField}
                                          index={index}
                                          canBeRemoved={
                                            stopsField.state.value.length > 2
                                          }
                                        />
                                      )}
                                    </form.Field>
                                  )}
                                </form.Field>
                              ))}

                              <Button
                                variant="outline"
                                size="sm"
                                className="w-fit"
                                onClick={() => {
                                  stopsField.pushValue({
                                    id:
                                      Math.max(
                                        0,
                                        ...stopsField.state.value.map(
                                          (s) => s.id,
                                        ),
                                      ) + 1,
                                    color: randomHexColor(),
                                    stop: Math.min(
                                      100,
                                      stopsField.state.value[
                                        stopsField.state.value.length - 1
                                      ].stop + 10,
                                    ),
                                  });
                                }}
                              >
                                <PlusIcon />
                                Add color
                              </Button>
                            </>
                          )}
                        </form.Field>
                      </FieldSet>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FieldGroup>

              <form.Subscribe
                selector={(state) => ({
                  values: state.values,
                  isValid: state.isValid,
                })}
              >
                {({ values, isValid }) => {
                  const generateCSSGradient = () => {
                    const directionValue =
                      values.direction === "custom"
                        ? `${values.degree}deg`
                        : values.direction;
                    const colorStops = values.stops
                      .map(({ color, stop }) => `${color} ${stop}%`)
                      .join(", ");

                    return `linear-gradient(${directionValue}, ${colorStops})`;
                  };

                  const gradientStyle = isValid
                    ? { background: generateCSSGradient() }
                    : {
                        background:
                          "linear-gradient(to right, #8e3dff 0%, #ff3d8e 100%)",
                      };

                  return (
                    <div
                      className={cn(
                        "h-48 w-full rounded-lg md:max-w-xs",
                        !isValid && "opacity-30",
                      )}
                      style={gradientStyle}
                      aria-label="Gradient preview"
                      role="img"
                    />
                  );
                }}
              </form.Subscribe>
            </div>

            <FieldGroup>
              <FieldSet>
                <form.Subscribe
                  selector={(state) => ({
                    values: state.values,
                    isValid: state.isValid,
                  })}
                >
                  {({ values, isValid }) => {
                    const generateCSSGradient = () => {
                      const directionValue =
                        values.direction === "custom"
                          ? `${values.degree}deg`
                          : values.direction;
                      const colorStops = values.stops
                        .map(({ color, stop }) => `${color} ${stop}%`)
                        .join(", ");

                      return `linear-gradient(${directionValue}, ${colorStops})`;
                    };

                    const cssGradient = isValid
                      ? `background: ${generateCSSGradient()};`
                      : "";

                    const handleRandomizeColors = () => {
                      const randomizedStops = values.stops.map((stop) => ({
                        ...stop,
                        color: randomHexColor(),
                      }));
                      form.setFieldValue("stops", randomizedStops);
                    };

                    return (
                      <>
                        <Field aria-disabled={!isValid}>
                          <InputGroup>
                            <InputGroupTextarea
                              id="gradient-css"
                              value={cssGradient}
                              readOnly
                              aria-label="Generated CSS"
                              className="font-mono text-sm"
                              disabled={!isValid}
                            />

                            <InputGroupAddon
                              align="block-start"
                              className="border-b"
                            >
                              <InputGroupText>
                                <PaletteIcon />
                                Generated CSS
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>

                        <ButtonGroup>
                          <ButtonGroup>
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(cssGradient);
                              }}
                              disabled={!isValid}
                            >
                              <CopyIcon />
                              Copy CSS
                            </Button>
                          </ButtonGroup>

                          <ButtonGroup>
                            <Button
                              onClick={handleRandomizeColors}
                              disabled={!isValid}
                              variant="outline"
                            >
                              <ShuffleIcon />
                              Randomize colors
                            </Button>
                          </ButtonGroup>
                        </ButtonGroup>
                      </>
                    );
                  }}
                </form.Subscribe>
              </FieldSet>
            </FieldGroup>
          </div>
        </div>
      </div>
    </>
  );
}
