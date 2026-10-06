import { Button } from "#/components/ui/button";
import { FieldGroup } from "#/components/ui/field";
import { cn } from "#/lib/cn";
import { generateHeadMeta } from "#/lib/head";
import {
  ReactQRCode,
  type DataModulesStyle,
  type FinderPatternInnerStyle,
  type FinderPatternOuterStyle,
  type ReactQRCodeRef,
} from "@lglab/react-qr-code";
import { CopyIcon, DownloadIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import z from "zod";
import { Separator } from "#/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { SidebarTrigger } from "#/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#/components/ui/accordion";
import BackgroundSettings from "#/components/qr/background";
import DataModulesSettings from "#/components/qr/data-modules";
import FinderPatternsSettings from "#/components/qr/finder-patterns";
import { finderPatternInnerStyles } from "#/lib/qr";
import ImageSettings from "#/components/qr/image";
import GeneralSettings from "#/components/qr/general";
import { ButtonGroup } from "#/components/ui/button-group";

export const Route = createFileRoute("/qr-code")({
  head: () => ({
    meta: generateHeadMeta({
      title: "QR Code generator - fooble.dev Tools",
      description: "Generate QR Codes for URLs, text and other custom values.",
      url: "https://tools.fooble.dev/qr-code",
      isPublic: true,
      type: "website",
      keywords: [
        "qr code",
        "qr code generator",
        "qr code generator online",
        "qr code generator free",
        "Fooble",
      ],
      bgPath: "/assets/qr/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/qr/icon.ico",
      },
    ],
  }),
  component: QRCodeRoute,
});

const formSchema = z.object({
  value: z.string().min(1, "To generate a QR Code, please enter a value!"),
  size: z.number().min(16).max(256),

  bgTransparent: z.boolean(),
  bgColor: z.string(),

  dataModulesColor: z.string(),
  dataModulesStyle: z.string(),
  dataModulesRandomSize: z.boolean(),
  dataModulesSize: z.number().min(0.75).max(1),
  dataModulesLineWidth: z.number().min(0.25).max(1),

  finderPatternsOuterColor: z.string(),
  finderPatternsOuterStyle: z.string(),

  finderPatternsInnerColor: z.string(),
  finderPatternsInnerStyle: z.string(),

  showImage: z.boolean(),
  imageSrc: z.string(),
  imageWidth: z.number().min(8).max(64),
  imageHeight: z.number().min(8).max(64),
});

function QRCodeRoute() {
  const form = useForm({
    defaultValues: {
      value: "https://fooble.dev",
      size: 256,

      bgTransparent: false,
      bgColor: "#FFFFFF",

      dataModulesColor: "#000000",
      dataModulesStyle: "square",
      dataModulesRandomSize: false,
      dataModulesSize: 1,
      dataModulesLineWidth: 0.75,

      finderPatternsOuterColor: "#000000",
      finderPatternsOuterStyle: "square",

      finderPatternsInnerColor: "#000000",
      finderPatternsInnerStyle: "square",

      showImage: false,
      imageSrc: "https://upload.fooble.dev/fooble/rainbow/logo.png",
      imageWidth: 32,
      imageHeight: 32,
    },
    validators: {
      onChange: formSchema,
    },
  });

  const qrRef = useRef<ReactQRCodeRef>(null);

  const download = () => {
    qrRef.current?.download({
      name: "fooble-qr-code",
      format: "png",
      size: 1024,
    });
  };

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
                <BreadcrumbPage>QR Code generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0 qr">
        <div className="mx-auto max-w-4xl w-full">
          <img
            src="/assets/qr/text.png"
            className="h-16 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">QR Code generator</h1>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <FieldGroup className="flex-1">
              <Accordion className="gap-2" defaultValue={["general"]}>
                <AccordionItem value="general">
                  <AccordionTrigger>General</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="value">
                      {(valueField) => (
                        <form.Field name="size">
                          {(sizeField) => (
                            <GeneralSettings
                              valueField={valueField}
                              sizeField={sizeField}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger>Background</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="bgTransparent">
                      {(transparentField) => (
                        <form.Field name="bgColor">
                          {(colorField) => (
                            <BackgroundSettings
                              transparentField={transparentField}
                              colorField={colorField}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger>Data modules</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="dataModulesColor">
                      {(colorField) => (
                        <form.Field name="dataModulesStyle">
                          {(styleField) => (
                            <form.Field name="dataModulesRandomSize">
                              {(randomSizeField) => (
                                <form.Field name="dataModulesSize">
                                  {(sizeField) => (
                                    <form.Field name="dataModulesLineWidth">
                                      {(lineWidthField) => (
                                        <DataModulesSettings
                                          colorField={colorField}
                                          styleField={styleField}
                                          randomSizeField={randomSizeField}
                                          sizeField={sizeField}
                                          lineWidthField={lineWidthField}
                                        />
                                      )}
                                    </form.Field>
                                  )}
                                </form.Field>
                              )}
                            </form.Field>
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger>Finder patterns outer</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="finderPatternsOuterStyle">
                      {(styleField) => (
                        <form.Field name="finderPatternsOuterColor">
                          {(colorField) => (
                            <FinderPatternsSettings
                              colorField={colorField}
                              styleField={styleField}
                              styles={finderPatternInnerStyles}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger>Finder patterns inner</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="finderPatternsInnerStyle">
                      {(styleField) => (
                        <form.Field name="finderPatternsInnerColor">
                          {(colorField) => (
                            <FinderPatternsSettings
                              colorField={colorField}
                              styleField={styleField}
                              styles={finderPatternInnerStyles}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                  <AccordionTrigger>Image</AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <form.Field name="showImage">
                      {(toggleField) => (
                        <form.Field name="imageSrc">
                          {(srcField) => (
                            <form.Field name="imageHeight">
                              {(heightField) => (
                                <form.Field name="imageWidth">
                                  {(widthField) => (
                                    <ImageSettings
                                      toggleField={toggleField}
                                      srcField={srcField}
                                      widthField={widthField}
                                      heightField={heightField}
                                    />
                                  )}
                                </form.Field>
                              )}
                            </form.Field>
                          )}
                        </form.Field>
                      )}
                    </form.Field>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
                    <ButtonGroup>
                      <ButtonGroup>
                        <Button onClick={download} disabled={!isValid}>
                          <DownloadIcon />
                          Download PNG
                        </Button>
                      </ButtonGroup>

                      <ButtonGroup>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(parsedValue);
                          }}
                          disabled={!isValid}
                          variant="outline"
                        >
                          <CopyIcon />
                          Copy value
                        </Button>
                      </ButtonGroup>
                    </ButtonGroup>
                  );
                }}
              </form.Subscribe>
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
                        background={
                          values.bgTransparent ? undefined : values.bgColor
                        }
                        dataModulesSettings={{
                          color: values.dataModulesColor,
                          style: values.dataModulesStyle as DataModulesStyle,
                          randomSize: values.dataModulesRandomSize,
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
                          values.showImage
                            ? {
                                src: values.imageSrc,
                                width: values.imageWidth,
                                height: values.imageHeight,
                                excavate: true,
                              }
                            : undefined
                        }
                        ref={qrRef}
                      />
                    </div>
                  );
                }}
              </form.Subscribe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
