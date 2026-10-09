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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "#/components/ui/input-group";
import { Progress } from "#/components/ui/progress";
import { Separator } from "#/components/ui/separator";
import { SidebarTrigger } from "#/components/ui/sidebar";
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
import { createFileRoute, Link } from "@tanstack/react-router";
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
  length: z.number().min(4).max(32),

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
                Security
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Password generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4 pt-0 password">
        <div className="mx-auto max-w-4xl w-full">
          <img
            src="/assets/password/text.png"
            className="h-16 w-auto mx-auto mb-4 lg:mb-8"
            aria-hidden="true"
            alt="Password generator"
          />
          <h1 className="sr-only">Password generator</h1>

          <FieldGroup className="w-full">
            <Accordion
              className="gap-2"
              defaultValue={["general", "types"]}
              multiple
            >
              <AccordionItem value="general">
                <AccordionTrigger>General</AccordionTrigger>

                <AccordionContent className="pb-4">
                  <FieldSet className="ml-4 mr-2">
                    <form.Field
                      name="length"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;

                        return (
                          <Field
                            data-invalid={isInvalid}
                            orientation="horizontal"
                          >
                            <FieldLabel htmlFor={field.name}>Size</FieldLabel>

                            <Slider
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onValueChange={(value) =>
                                field.handleChange(value as number)
                              }
                              aria-invalid={isInvalid}
                              max={32}
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="types">
                <AccordionTrigger>Character types</AccordionTrigger>

                <AccordionContent className="pb-4">
                  <FieldSet className="ml-4 mr-2">
                    <form.Field
                      name="lowercase"
                      children={(field) => (
                        <Field orientation="horizontal" className="mt-2">
                          <FieldLabel htmlFor={field.name}>
                            Lowercase letters
                          </FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />

                    <form.Field
                      name="uppercase"
                      children={(field) => (
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor={field.name}>
                            Uppercase letters
                          </FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />

                    <form.Field
                      name="numbers"
                      children={(field) => (
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor={field.name}>Numbers</FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />

                    <form.Field
                      name="symbols"
                      children={(field) => (
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor={field.name}>Symbols</FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />

                    <form.Field
                      name="whitespace"
                      children={(field) => (
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor={field.name}>
                            Whitespace
                          </FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />

                    <form.Field
                      name="minimizeDuplicates"
                      children={(field) => (
                        <Field orientation="horizontal">
                          <FieldLabel htmlFor={field.name}>
                            Minimize duplicate characters
                          </FieldLabel>
                          <Switch
                            id={field.name}
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(value) =>
                              field.handleChange(value)
                            }
                          />
                        </Field>
                      )}
                    />
                  </FieldSet>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FieldSet className="mt-4">
              <Field>
                <InputGroup>
                  <InputGroupTextarea
                    id="generated-password"
                    value={password}
                    readOnly
                    aria-label="Generated password"
                    className="font-mono text-sm"
                  />

                  <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText>
                      <PasswordIcon />
                      Generated password
                    </InputGroupText>
                  </InputGroupAddon>

                  <InputGroupAddon align="block-end" className="border-t">
                    <Progress
                      value={calculatePasswordStrength(password).score}
                      className="w-full"
                    />

                    <InputGroupText className="text-nowrap">
                      {calculatePasswordStrength(password).strength}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <ButtonGroup>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                    }}
                  >
                    <CopyIcon />
                    Copy
                  </Button>
                </ButtonGroup>

                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setPassword(generatePassword(form.state.values));
                    }}
                    variant="outline"
                  >
                    <ArrowClockwiseIcon />
                    Regenerate
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </div>
    </>
  );
}
