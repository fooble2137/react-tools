import DataModulesStyleSelect from "#/components/qr/data-modules-style";
import FinderPatternInnerStyleSelect from "#/components/qr/finder-pattern-inner-style";
import FinderPatternOuterStyleSelect from "#/components/qr/finder-pattern-outer-style";
import PresetsDropdown from "#/components/qr/presets-dropdown";
import { Button } from "#/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";
import { cn } from "#/lib/cn";
import { getDataModulesStyleByValue } from "#/lib/qr";
import {
  ReactQRCode,
  type DataModulesStyle,
  type FinderPatternInnerStyle,
  type FinderPatternOuterStyle,
  type ReactQRCodeRef,
} from "@lglab/react-qr-code";
import { DownloadIcon, ImageIcon, QrCodeIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import z from "zod";

export const Route = createFileRoute("/qr-code")({
  head: () => ({
    links: [
      {
        rel: "icon",
        href: "/qr/icon.ico",
      },
    ],
  }),
  component: RouteComponent,
});

const formSchema = z.object({
  value: z.string().min(1, "To generate a QR Code, please enter a value!"),
  size: z.number().min(16).max(256),

  bgColor: z.string(),

  dataModulesColor: z.string(),
  dataModulesStyle: z.string(),
  dataModulesSize: z.number().min(0.75).max(1),
  dataModulesLineWidth: z.number().min(0.25).max(1),

  finderPatternsOuterColor: z.string(),
  finderPatternsOuterStyle: z.string(),

  finderPatternsInnerColor: z.string(),
  finderPatternsInnerStyle: z.string(),

  imageSrc: z.string(),
  imageWidth: z.number().min(8).max(64),
  imageHeight: z.number().min(8).max(64),
  imageExcavate: z.boolean(),
  imageX: z.number().min(1).max(256),
  imageY: z.number().min(1).max(256),
  imageOpacity: z.number().min(0).max(1),
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      value: "https://fooble.dev",
      size: 256,

      bgColor: "#ffffff",

      dataModulesColor: "#000000",
      dataModulesStyle: "square",
      dataModulesSize: 1,
      dataModulesLineWidth: 0.75,

      finderPatternsOuterColor: "#000000",
      finderPatternsOuterStyle: "square",

      finderPatternsInnerColor: "#000000",
      finderPatternsInnerStyle: "square",

      imageSrc: "https://upload.fooble.dev/fooble/rainbow/logo.png",
      imageWidth: 32,
      imageHeight: 32,
      imageExcavate: true,
      imageX: 16,
      imageY: 16,
      imageOpacity: 1,
    },
    validators: {
      onChange: formSchema,
    },
  });

  const qrRef = useRef<ReactQRCodeRef>(null);

  const [bgTransparent, setBgTransparent] = useState(false);
  const [dataModulesRandomSize, setDataModulesRandomSize] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageCentered, setImageCentered] = useState(true);

  const download = () => {
    qrRef.current?.download({
      name: "fooble-qr-code",
      format: "png",
      size: 1024,
    });
  };

  return (
    <>
      <style>
        {`body {
          background-color: #39A95C;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden qr">
        <div className="bg-background mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full md:mb-10 mb-0">
          <img
            src="/qr/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">QR Code generator</h1>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <FieldGroup className="flex-1 md:min-w-xs min-w-0 sm:min-w-md">
              <FieldSet>
                <FieldSeparator>General</FieldSeparator>

                <form.Field
                  name="value"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Value</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="https://fooble.dev"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <QrCodeIcon />
                          </InputGroupAddon>

                          <PresetsDropdown
                            changeValue={(value) => field.handleChange(value)}
                          />
                        </InputGroup>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="size"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Size</FieldLabel>
                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          max={256}
                          min={16}
                          step={8}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}px
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <FieldSeparator>Background</FieldSeparator>

                <Field orientation="horizontal">
                  <FieldLabel htmlFor="bg-transparent">Transparent</FieldLabel>
                  <Switch
                    id="bg-transparent"
                    name="bg-transparent"
                    checked={bgTransparent}
                    onCheckedChange={setBgTransparent}
                  />
                </Field>

                <form.Field
                  name="bgColor"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                        <InputGroup aria-disabled={bgTransparent}>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            disabled={bgTransparent}
                            placeholder="#ffffff"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <div
                              className="size-4 rounded-sm border border-border"
                              style={{ backgroundColor: field.state.value }}
                            />
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
                <FieldSeparator>Data modules</FieldSeparator>

                <form.Field
                  name="dataModulesColor"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="#000000"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <div
                              className="size-4 rounded-sm border border-border"
                              style={{ backgroundColor: field.state.value }}
                            />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="dataModulesStyle"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Style</FieldLabel>
                        <DataModulesStyleSelect
                          name={field.name}
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Subscribe
                  selector={(state) => ({
                    values: state.values,
                  })}
                >
                  {({ values }) => {
                    const currentDataModulesStyle = getDataModulesStyleByValue(
                      values.dataModulesStyle,
                    );

                    return (
                      <>
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor="dm-random-size">
                            Random size
                          </FieldLabel>
                          <Switch
                            id="dm-random-size"
                            name="dm-random-size"
                            checked={dataModulesRandomSize}
                            onCheckedChange={setDataModulesRandomSize}
                            disabled={
                              !currentDataModulesStyle ||
                              !currentDataModulesStyle.variableSize
                            }
                          />
                        </Field>

                        {!currentDataModulesStyle ||
                        currentDataModulesStyle.variableLineWidth ? (
                          <form.Field
                            name="dataModulesLineWidth"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                              return (
                                <Field
                                  data-invalid={isInvalid}
                                  orientation="horizontal"
                                >
                                  <FieldLabel htmlFor={field.name}>
                                    Size
                                  </FieldLabel>

                                  <Slider
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onValueChange={(value) =>
                                      field.handleChange(value as number)
                                    }
                                    aria-invalid={isInvalid}
                                    disabled={
                                      !currentDataModulesStyle ||
                                      !currentDataModulesStyle.variableLineWidth ||
                                      dataModulesRandomSize
                                    }
                                    max={1}
                                    min={0.25}
                                    step={0.01}
                                  />

                                  <FieldDescription className="w-16 text-right">
                                    {field.state.value}
                                  </FieldDescription>
                                </Field>
                              );
                            }}
                          />
                        ) : (
                          <form.Field
                            name="dataModulesSize"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                              return (
                                <Field
                                  data-invalid={isInvalid}
                                  orientation="horizontal"
                                >
                                  <FieldLabel htmlFor={field.name}>
                                    Size
                                  </FieldLabel>

                                  <Slider
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onValueChange={(value) =>
                                      field.handleChange(value as number)
                                    }
                                    aria-invalid={isInvalid}
                                    disabled={
                                      !currentDataModulesStyle ||
                                      !currentDataModulesStyle.variableSize
                                    }
                                    max={1}
                                    min={0.75}
                                    step={0.01}
                                  />

                                  <FieldDescription className="w-16 text-right">
                                    {field.state.value}
                                  </FieldDescription>
                                </Field>
                              );
                            }}
                          />
                        )}
                      </>
                    );
                  }}
                </form.Subscribe>
              </FieldSet>

              <FieldSet>
                <FieldSeparator>Finder patterns outer</FieldSeparator>

                <form.Field
                  name="finderPatternsOuterColor"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="#000000"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <div
                              className="size-4 rounded-sm border border-border"
                              style={{ backgroundColor: field.state.value }}
                            />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="finderPatternsOuterStyle"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Style</FieldLabel>
                        <FinderPatternOuterStyleSelect
                          name={field.name}
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        />
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <FieldSeparator>Finder patterns inner</FieldSeparator>

                <form.Field
                  name="finderPatternsInnerColor"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="#000000"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <div
                              className="size-4 rounded-sm border border-border"
                              style={{ backgroundColor: field.state.value }}
                            />
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="finderPatternsInnerStyle"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Style</FieldLabel>
                        <FinderPatternInnerStyleSelect
                          name={field.name}
                          value={field.state.value}
                          onValueChange={field.handleChange}
                        />
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <FieldSeparator>Image</FieldSeparator>

                <Field orientation="horizontal">
                  <FieldLabel htmlFor="image-visible">Show image</FieldLabel>
                  <Switch
                    id="image-visible"
                    name="image-visible"
                    checked={imageVisible}
                    onCheckedChange={setImageVisible}
                  />
                </Field>

                <form.Field
                  name="imageSrc"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            disabled={!imageVisible}
                            placeholder="https://upload.fooble.dev"
                            autoComplete="off"
                          />

                          <InputGroupAddon>
                            <ImageIcon />
                          </InputGroupAddon>
                        </InputGroup>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="imageExcavate"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Excavate</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                          disabled={!imageVisible}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="imageWidth"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Width</FieldLabel>

                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          disabled={!imageVisible}
                          max={64}
                          min={8}
                          step={1}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="imageHeight"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Height</FieldLabel>

                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          disabled={!imageVisible}
                          max={64}
                          min={8}
                          step={1}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />

                <Field orientation="horizontal">
                  <FieldLabel htmlFor="image-centered">Centered</FieldLabel>
                  <Switch
                    id="image-centered"
                    name="image-centered"
                    checked={imageCentered}
                    onCheckedChange={setImageCentered}
                    disabled={!imageVisible}
                  />
                </Field>

                <form.Field
                  name="imageX"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>X</FieldLabel>

                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          disabled={!imageVisible || imageCentered}
                          max={256}
                          min={1}
                          step={1}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="imageY"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Y</FieldLabel>

                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          disabled={!imageVisible || imageCentered}
                          max={256}
                          min={1}
                          step={1}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />

                <FieldDescription>
                  X and Y are relative to the top-left corner of the QR Code.
                </FieldDescription>
              </FieldSet>
            </FieldGroup>

            <div className="flex flex-col items-center gap-y-4 shrink-0">
              <form.Subscribe
                selector={(state) => ({
                  values: state.values,
                  isValid: state.isValid,
                })}
              >
                {({ values, isValid }) => {
                  const parsedValue =
                    values.value.trim() === ""
                      ? "https://fooble.dev"
                      : values.value.trim();

                  return (
                    <div
                      className={cn(
                        "w-64 h-64 bg-secondary flex items-center justify-center overflow-hidden rounded-md ring ring-border",
                        !isValid && "opacity-30",
                      )}
                    >
                      <ReactQRCode
                        value={parsedValue}
                        size={values.size}
                        marginSize={4}
                        background={bgTransparent ? undefined : values.bgColor}
                        dataModulesSettings={{
                          color: values.dataModulesColor,
                          style: values.dataModulesStyle as DataModulesStyle,
                          randomSize: dataModulesRandomSize,
                          size: values.dataModulesSize,
                          lineWidth: values.dataModulesLineWidth,
                        }}
                        finderPatternOuterSettings={{
                          color: values.finderPatternsOuterColor,
                          style:
                            values.finderPatternsOuterStyle as FinderPatternOuterStyle,
                        }}
                        finderPatternInnerSettings={{
                          color: values.finderPatternsInnerColor,
                          style:
                            values.finderPatternsInnerStyle as FinderPatternInnerStyle,
                        }}
                        imageSettings={
                          imageVisible
                            ? {
                                src: values.imageSrc,
                                width: values.imageWidth,
                                height: values.imageHeight,
                                excavate: values.imageExcavate,
                                x: imageCentered ? undefined : values.imageX,
                                y: imageCentered ? undefined : values.imageY,
                                opacity: values.imageOpacity,
                              }
                            : undefined
                        }
                        ref={qrRef}
                      />
                    </div>
                  );
                }}
              </form.Subscribe>

              <div className="flex items-center justify-center gap-4">
                <Button onClick={download} size="lg">
                  <DownloadIcon />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
