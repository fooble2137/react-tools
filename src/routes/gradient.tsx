import { Button } from "#/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "#/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { randomHexColor } from "#/lib/gradient";
import { generateHeadMeta } from "#/lib/head";
import {
  CopyIcon,
  PaletteIcon,
  PlusIcon,
  ShuffleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

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

const directions = [
  {
    label: "To right",
    value: "to right",
  },
  {
    label: "To left",
    value: "to left",
  },
  {
    label: "To bottom",
    value: "to bottom",
  },
  {
    label: "To top",
    value: "to top",
  },
  {
    label: "To bottom right",
    value: "to bottom right",
  },
  {
    label: "To bottom left",
    value: "to bottom left",
  },
  {
    label: "To top right",
    value: "to top right",
  },
  {
    label: "To top left",
    value: "to top left",
  },
  {
    label: "Custom angle",
    value: "custom",
  },
];

function GradientGeneratorRoute() {
  const [direction, setDirection] = useState("to right");
  const [degree, setDegree] = useState(90);
  const [stops, setStops] = useState([
    { id: 1, color: "#8e3dff", stop: 0 },
    { id: 2, color: "#ff3d8e", stop: 100 },
  ]);

  const sortedStops = useMemo(
    () =>
      [...stops].sort(
        (first, second) => first.stop - second.stop || first.id - second.id,
      ),
    [stops],
  );

  const gradientValue = useMemo(() => {
    const directionValue = direction === "custom" ? `${degree}deg` : direction;
    const colorStops = sortedStops
      .map(({ color, stop }) => `${color} ${stop}%`)
      .join(", ");

    return `linear-gradient(${directionValue}, ${colorStops})`;
  }, [degree, direction, sortedStops]);

  const cssGradient = `background: ${gradientValue};`;

  const updateStop = (
    id: number,
    property: "color" | "stop",
    value: string,
  ) => {
    setStops((currentStops) =>
      currentStops.map((currentStop) =>
        currentStop.id === id
          ? {
              ...currentStop,
              [property]:
                property === "stop"
                  ? Math.min(100, Math.max(0, Number(value) || 0))
                  : value,
            }
          : currentStop,
      ),
    );
  };

  return (
    <>
      <style>
        {`body {
          background-color: #8e3dff;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden gradient">
        <div className="bg-background mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full md:mb-10 mb-0">
          <img
            src="/assets/gradient/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">Gradient generator</h1>

          <FieldGroup className="w-full md:min-w-md">
            <FieldSet>
              <FieldSeparator>Direction</FieldSeparator>

              <Field>
                <FieldLabel htmlFor="gradient-direction">
                  Gradient direction
                </FieldLabel>
                <Select
                  items={directions.map((direction) => ({
                    label: direction.label,
                    value: direction.value,
                  }))}
                  value={direction}
                  onValueChange={(value) => setDirection(value ?? "to right")}
                >
                  <SelectTrigger id="gradient-direction" className="w-full">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {directions.map((direction) => (
                      <SelectItem key={direction.value} value={direction.value}>
                        {direction.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field orientation="horizontal">
                <FieldLabel htmlFor="gradient-degree">Angle</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="gradient-degree"
                    type="number"
                    min={0}
                    max={360}
                    value={degree}
                    onChange={(event) =>
                      setDegree(
                        Math.min(
                          360,
                          Math.max(0, Number(event.target.value) || 0),
                        ),
                      )
                    }
                    disabled={direction !== "custom"}
                  />
                  <InputGroupAddon align="inline-end">deg</InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldSet>

            <FieldSet>
              <FieldSeparator>Colors</FieldSeparator>

              {sortedStops.map((stop, index) => (
                <Field key={stop.id} orientation="horizontal">
                  <FieldLabel
                    htmlFor={`gradient-color-${stop.id}`}
                    className="w-32"
                  >
                    Color {index + 1}
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      id={`gradient-color-${stop.id}`}
                      value={stop.color}
                      onChange={(event) =>
                        updateStop(stop.id, "color", event.target.value)
                      }
                      aria-label={`Color ${index + 1}`}
                    />
                    <InputGroupAddon>
                      <div
                        className="size-4 rounded-sm border border-border"
                        style={{ backgroundColor: stop.color }}
                      />
                    </InputGroupAddon>
                  </InputGroup>

                  <InputGroup className="w-20 shrink-0">
                    <InputGroupInput
                      type="number"
                      min={0}
                      max={100}
                      value={stop.stop}
                      onChange={(event) =>
                        updateStop(stop.id, "stop", event.target.value)
                      }
                      aria-label={`Color ${index + 1} stop`}
                    />
                    <InputGroupAddon align="inline-end">%</InputGroupAddon>
                  </InputGroup>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove color ${index + 1}`}
                    disabled={stops.length <= 2}
                    onClick={() =>
                      setStops((currentStops) =>
                        currentStops.filter(
                          (currentStop) => currentStop.id !== stop.id,
                        ),
                      )
                    }
                  >
                    <TrashIcon />
                  </Button>
                </Field>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setStops((currentStops) => [
                    ...currentStops,
                    {
                      id: Date.now(),
                      color: randomHexColor(),
                      stop:
                        currentStops.length > 0
                          ? Math.min(
                              100,
                              currentStops[currentStops.length - 1].stop + 10,
                            )
                          : 0,
                    },
                  ])
                }
              >
                <PlusIcon />
                Add color stop
              </Button>
            </FieldSet>

            <FieldSet>
              <FieldSeparator />

              <div
                className="h-48 w-full rounded-lg border shadow-sm"
                style={{ background: gradientValue }}
                aria-label="Gradient preview"
                role="img"
              />

              <Field>
                <FieldLabel htmlFor="gradient-css">CSS output</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="gradient-css"
                    value={cssGradient}
                    readOnly
                    aria-label="Generated CSS"
                  />

                  <InputGroupAddon>
                    <PaletteIcon />
                  </InputGroupAddon>

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Copy CSS"
                      onClick={() => navigator.clipboard.writeText(cssGradient)}
                    >
                      <CopyIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Button
                size="lg"
                className="w-fit mx-auto"
                onClick={() =>
                  setStops((currentStops) =>
                    currentStops.map((stop) => ({
                      ...stop,
                      color: randomHexColor(),
                    })),
                  )
                }
              >
                <ShuffleIcon />
                Randomize colors
              </Button>
            </FieldSet>
          </FieldGroup>
        </div>
      </main>
    </>
  );
}
