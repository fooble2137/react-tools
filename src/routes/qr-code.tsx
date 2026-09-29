import Button from "#/components/button";
import Input from "#/components/input";
import { cn } from "#/lib/cn";
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code";
import { DownloadIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

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

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      value: "https://fooble.dev",
      margin: 2,
      bgColor: "#ffffff",
      dataModulesColor: "#000000",
      finderPatternsInnerColor: "#000000",
      finderPatternsOuterColor: "#000000",
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
          background-color: #39A95C;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden qr">
        <div className="bg-gray-100 mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full">
          <img
            src="/qr/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
          />
          <h1 className="sr-only">QR Code generator</h1>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="w-full relative">
                  <div className="h-px w-full bg-gray-300" />
                  <h2 className="absolute -top-3 right-2 bg-gray-100 px-2 text-sm text-gray-500">
                    General
                  </h2>
                </div>

                <form.Field name="value">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm">Value</label>

                      <Input
                        placeholder="https://fooble.dev"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="margin">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm">Margin</label>

                      <Input
                        type="number"
                        min={0}
                        max={10}
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

              <div className="space-y-4">
                <div className="w-full relative">
                  <div className="h-px w-full bg-gray-300" />
                  <h2 className="absolute -top-3 right-2 bg-gray-100 px-2 text-sm text-gray-500">
                    Colors
                  </h2>
                </div>

                <form.Field name="bgColor">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm">Background</label>

                      <Input
                        placeholder="#ffffff"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="dataModulesColor">
                  {(field) => (
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-sm text-nowrap">
                        Data modules
                      </label>

                      <Input
                        placeholder="#000000"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </form.Field>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <form.Field name="finderPatternsInnerColor">
                    {(field) => (
                      <div className="flex flex-col gap-y-1">
                        <label className="font-medium text-sm text-nowrap">
                          Finder patterns inner
                        </label>

                        <Input
                          placeholder="#000000"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="finderPatternsOuterColor">
                    {(field) => (
                      <div className="flex flex-col gap-y-1">
                        <label className="font-medium text-sm text-nowrap">
                          Finder patterns outer
                        </label>

                        <Input
                          placeholder="#000000"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-4 shrink-0">
              <form.Subscribe
                selector={(state) => ({
                  value: state.values.value,
                  margin: state.values.margin,
                  bgColor: state.values.bgColor,
                  dataModulesColor: state.values.dataModulesColor,
                  finderPatternsInnerColor:
                    state.values.finderPatternsInnerColor,
                  finderPatternsOuterColor:
                    state.values.finderPatternsOuterColor,
                })}
              >
                {({
                  value,
                  margin,
                  bgColor,
                  dataModulesColor,
                  finderPatternsInnerColor,
                  finderPatternsOuterColor,
                }) => {
                  const parsedValue =
                    value.trim() === "" ? "https://fooble.dev" : value.trim();
                  const parsedMargin = isNaN(Number(margin))
                    ? 5
                    : Number(margin);
                  const parsedBgColor =
                    bgColor.trim() === "" ? "#ffffff" : bgColor.trim();
                  const parsedDataModulesColor =
                    dataModulesColor.trim() === ""
                      ? "#000000"
                      : dataModulesColor.trim();
                  const parsedFinderPatternsInnerColor =
                    finderPatternsInnerColor.trim() === ""
                      ? "#000000"
                      : finderPatternsInnerColor.trim();
                  const parsedFinderPatternsOuterColor =
                    finderPatternsOuterColor.trim() === ""
                      ? "#000000"
                      : finderPatternsOuterColor.trim();

                  return (
                    <div
                      className={cn(
                        "w-64 h-64 bg-gray-200 flex items-center justify-center overflow-hidden rounded-md",
                        value.trim() === "" && "opacity-30",
                      )}
                    >
                      <ReactQRCode
                        marginSize={parsedMargin}
                        value={parsedValue}
                        background={parsedBgColor}
                        dataModulesSettings={{
                          color: parsedDataModulesColor,
                        }}
                        finderPatternInnerSettings={{
                          color: parsedFinderPatternsInnerColor,
                        }}
                        finderPatternOuterSettings={{
                          color: parsedFinderPatternsOuterColor,
                        }}
                        size={256}
                        ref={qrRef}
                      />
                    </div>
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
