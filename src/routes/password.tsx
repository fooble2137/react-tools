import {
  Field,
  FieldDescription,
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
  Progress,
  ProgressLabel,
  ProgressValue,
} from "#/components/ui/progress";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";
import { generateHeadMeta } from "#/lib/head";
import { calculatePasswordStrength, generatePassword } from "#/lib/password";
import {
  ArrowClockwiseIcon,
  CopyIcon,
  PasswordIcon,
} from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";

export const Route = createFileRoute("/password")({
  head: () => ({
    meta: generateHeadMeta({
      title: "Password generator - fooble.dev Tools",
      description: "Generate secure passwords according to your chosen rules.",
      url: "https://tools.fooble.dev/password",
      isPublic: true,
      type: "website",
      keywords: ["password", "generator", "secure", "random", "Fooble"],
      bgPath: "/assets/password/bg.png",
    }),
    links: [
      {
        rel: "icon",
        href: "/assets/password/icon.ico",
      },
    ],
  }),
  component: PasswordGeneratorRoute,
});

const formSchema = z.object({
  length: z.number().min(4).max(64),

  lowercase: z.boolean(),
  uppercase: z.boolean(),
  numbers: z.boolean(),
  symbols: z.boolean(),
  whitespace: z.boolean(),
  minimizeDuplicates: z.boolean(),
});

function PasswordGeneratorRoute() {
  const [password, setPassword] = useState(
    generatePassword({
      length: 16,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
      whitespace: false,
      minimizeDuplicates: false,
    }),
  );

  const form = useForm({
    defaultValues: {
      length: 16,

      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
      whitespace: false,
      minimizeDuplicates: false,
    },
    validators: {
      onChange: formSchema,
    },
    listeners: {
      onChange: ({ formApi }) => {
        const password = generatePassword(formApi.state.values);
        setPassword(password);
      },
    },
  });

  return (
    <>
      <style>
        {`body {
          background-color: #109bff;
        }`}
      </style>

      <main className="sm:max-w-fit max-w-full w-full mx-auto sm:px-5 sm:mt-10 overflow-hidden password">
        <div className="bg-background mx-auto max-w-3xl md:w-fit w-full p-4 lg:p-8 sm:rounded-md shadow-md sm:h-fit sm:min-h-0 min-h-dvh h-full md:mb-10 mb-0">
          <img
            src="/assets/password/text.png"
            className="h-12 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
            alt="Password generator"
          />
          <h1 className="sr-only">Password generator</h1>

          <div className="sm:min-w-md">
            <FieldGroup className="w-full">
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="gen-password">
                    Generated password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="gen-password"
                      name="gen-password"
                      value={password}
                      readOnly
                    />

                    <InputGroupAddon>
                      <PasswordIcon />
                    </InputGroupAddon>

                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Copy"
                        size="icon-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(password);
                        }}
                      >
                        <CopyIcon />
                      </InputGroupButton>
                    </InputGroupAddon>

                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Regenerate"
                        size="icon-xs"
                        onClick={() => {
                          setPassword(generatePassword(form.state.values));
                        }}
                      >
                        <ArrowClockwiseIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldSet>
              <FieldSet>
                <FieldSeparator />

                <form.Field
                  name="length"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Length</FieldLabel>
                        <Slider
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onValueChange={(value) =>
                            field.handleChange(value as number)
                          }
                          aria-invalid={isInvalid}
                          max={64}
                          min={4}
                          step={1}
                        />

                        <FieldDescription className="w-16 text-right">
                          {field.state.value}
                        </FieldDescription>
                      </Field>
                    );
                  }}
                />
              </FieldSet>
              <FieldSet>
                <FieldSeparator>Character types</FieldSeparator>

                <form.Field
                  name="lowercase"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Lowercase</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="uppercase"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Uppercase</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="numbers"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Numbers</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="symbols"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Symbols</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="whitespace"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>Whitespace</FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="minimizeDuplicates"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid} orientation="horizontal">
                        <FieldLabel htmlFor={field.name}>
                          Minimize duplicate characters
                        </FieldLabel>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(value) => field.handleChange(value)}
                        />
                      </Field>
                    );
                  }}
                />
              </FieldSet>

              <FieldSet>
                <FieldSeparator />

                <Progress value={calculatePasswordStrength(password)}>
                  <ProgressLabel>Password strength</ProgressLabel>
                  <ProgressValue />
                </Progress>
              </FieldSet>
            </FieldGroup>
          </div>
        </div>
      </main>
    </>
  );
}
