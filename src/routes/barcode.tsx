import Button from "#/components/button";
import Input from "#/components/input";
import {
  barcodeTypes,
  getDefaultBarcodeText,
  getFormatForBarcodeType,
  verifyBarcodeType,
  type BarcodeType,
} from "#/lib/barcode";
import { cn } from "#/lib/cn";
import { type ReactQRCodeRef } from "@lglab/react-qr-code";
import { DownloadIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import Barcode from "react-barcode";

export const Route = createFileRoute("/barcode")({
  head: () => ({
    links: [
      {
        rel: "icon",
        href: "/barcode/icon.ico",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      type: "CODE128" as BarcodeType,
      value: getDefaultBarcodeText("CODE128"),
      textAlign: "center" as "left" | "center" | "right",
      textPosition: "bottom" as "top" | "bottom",
      textMargin: 2,
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
      <style>
        {`body {
          background-color: #9b235b;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden barcode">
        <div className="bg-gray-100 mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full">
          <img
            src="/barcode/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">Barcode generator</h1>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="w-full relative">
                  <div className="h-px w-full bg-gray-300" />
                  <h2 className="absolute -top-3 right-2 bg-gray-100 px-2 text-sm text-gray-500">
                    General
                  </h2>
                </div>

                <form.Field name="type">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label
                        className="font-medium text-sm"
                        htmlFor="barcode-type"
                      >
                        Type
                      </label>

                      <select
                        id="barcode-type"
                        className="w-full bg-gray-200 rounded-md px-2 py-1 border-2 border-gray-200 transition-colors duration-200 text-sm focus:outline-none focus:border-page-primary"
                        value={field.state.value}
                        onChange={(e) => {
                          const type = e.target.value as BarcodeType;
                          field.handleChange(type);
                          form.setFieldValue(
                            "value",
                            getDefaultBarcodeText(type),
                          );
                        }}
                      >
                        {barcodeTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="value">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm">Value</label>

                      <Input
                        placeholder="Barcode value"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="space-y-4">
                <div className="w-full relative">
                  <div className="h-px w-full bg-gray-300" />
                  <h2 className="absolute -top-3 right-2 bg-gray-100 px-2 text-sm text-gray-500">
                    Text
                  </h2>
                </div>

                <form.Field name="textAlign">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label
                        className="font-medium text-sm"
                        htmlFor="text-align"
                      >
                        Align
                      </label>

                      <select
                        id="text-align"
                        className="w-full bg-gray-200 rounded-md px-2 py-1 border-2 border-gray-200 transition-colors duration-200 text-sm focus:outline-none focus:border-page-primary"
                        value={field.state.value}
                        onChange={(e) => {
                          const type = e.target.value as
                            "left" | "center" | "right";
                          field.handleChange(type);
                        }}
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="textPosition">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label
                        className="font-medium text-sm"
                        htmlFor="text-position"
                      >
                        Position
                      </label>

                      <select
                        id="text-position"
                        className="w-full bg-gray-200 rounded-md px-2 py-1 border-2 border-gray-200 transition-colors duration-200 text-sm focus:outline-none focus:border-page-primary"
                        value={field.state.value}
                        onChange={(e) => {
                          const type = e.target.value as "bottom" | "top";
                          field.handleChange(type);
                        }}
                      >
                        <option value="bottom">Bottom</option>
                        <option value="top">Top</option>
                      </select>
                    </div>
                  )}
                </form.Field>

                <form.Field name="textMargin">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm">Margin</label>

                      <Input
                        type="number"
                        min={0}
                        max={25}
                        placeholder="2"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-4 shrink-0">
              <form.Subscribe
                selector={(state) => ({
                  type: state.values.type,
                  value: state.values.value,
                  textAlign: state.values.textAlign,
                  textPosition: state.values.textPosition,
                  textMargin: state.values.textMargin,
                })}
              >
                {({ type, value, textAlign, textPosition, textMargin }) => {
                  let parsedValue =
                    value.trim() === ""
                      ? getDefaultBarcodeText(type)
                      : value.trim();

                  let verify = false;
                  try {
                    verify = verifyBarcodeType(parsedValue, type);
                    if (!verify) parsedValue = getDefaultBarcodeText(type);
                  } catch (error) {
                    parsedValue = getDefaultBarcodeText(type);
                  }

                  return (
                    <>
                      <div
                        className={cn(
                          "w-64 h-32 bg-gray-200 flex items-center justify-center overflow-hidden rounded-md",
                          (value.trim() === "" || !verify) && "opacity-30",
                        )}
                      >
                        <Barcode
                          value={parsedValue}
                          format={type}
                          textAlign={textAlign}
                          textPosition={textPosition}
                          textMargin={textMargin}
                          displayValue={true}
                        />
                      </div>

                      <p className="text-gray-600 text-sm text-center text-wrap w-64">
                        {getFormatForBarcodeType(type)}
                      </p>
                    </>
                  );
                }}
              </form.Subscribe>

              <div className="flex items-center justify-center gap-4">
                <Button icon={DownloadIcon} onClick={download}>
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
