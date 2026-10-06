import { ButtonGroup } from "#/components/ui/button-group";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "#/components/ui/input-group";
import { Slider } from "#/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group";
import { presets } from "#/lib/qr";
import {
  EnvelopeIcon,
  MapPinIcon,
  PasswordIcon,
  PhoneIcon,
  TextAaIcon,
  WifiHighIcon,
} from "@phosphor-icons/react";
import { type AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";

type GeneralSettingsProps = {
  valueField: AnyFieldApi;
  sizeField: AnyFieldApi;
};

const GeneralSettings = ({ valueField, sizeField }: GeneralSettingsProps) => {
  const [preset, setPreset] = useState("text");

  const [valueProps, setValueProps] = useState<string[]>([""]);

  const valueFieldIsInvalid =
    valueField.state.meta.isTouched && !valueField.state.meta.isValid;

  const sizeFieldIsInvalid =
    sizeField.state.meta.isTouched && !sizeField.state.meta.isValid;

  return (
    <FieldSet className="ml-4 mr-2">
      <ToggleGroup
        className="flex-wrap"
        value={[preset]}
        onValueChange={(value) => {
          const presetValue = presets.find(
            (p) => p.name === value[0],
          )?.defaultValue;

          if (!presetValue || presetValue === value[0]) return;

          setPreset(value[0]);
          valueField.handleChange(presetValue);

          if (value[0] === "wifi") {
            setValueProps(["MyNetwork", "mypassword"]);
          } else if (value[0] === "location") {
            setValueProps(["37.334606", "-122.009102"]);
          } else {
            setValueProps([""]);
          }
        }}
        variant="outline"
        size="sm"
      >
        {presets.map((p) => (
          <ToggleGroupItem key={p.name} value={p.name}>
            {p.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {preset === "text" ? (
        <Field data-invalid={valueFieldIsInvalid}>
          <FieldLabel htmlFor={valueField.name}>Value</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id={valueField.name}
              name={valueField.name}
              value={valueField.state.value}
              onChange={(e) => valueField.handleChange(e.target.value)}
              aria-invalid={valueFieldIsInvalid}
              placeholder="https://fooble.dev"
              autoComplete="off"
            />

            <InputGroupAddon>
              <TextAaIcon />
            </InputGroupAddon>
          </InputGroup>

          {valueFieldIsInvalid && (
            <FieldError errors={valueField.state.meta.errors} />
          )}
        </Field>
      ) : preset === "phone" ? (
        <Field data-invalid={valueFieldIsInvalid}>
          <FieldLabel htmlFor={valueField.name}>Phone number</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id={valueField.name}
              name={valueField.name}
              value={valueField.state.value.replace(/^tel:/, "")}
              onChange={(e) => valueField.handleChange(`tel:${e.target.value}`)}
              aria-invalid={valueFieldIsInvalid}
              placeholder="+493023125000"
              autoComplete="off"
            />

            <InputGroupAddon>
              <PhoneIcon />
            </InputGroupAddon>
            <InputGroupAddon>
              <InputGroupText>tel:</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {valueFieldIsInvalid && (
            <FieldError errors={valueField.state.meta.errors} />
          )}
        </Field>
      ) : preset === "email" ? (
        <Field data-invalid={valueFieldIsInvalid}>
          <FieldLabel htmlFor={valueField.name}>Mail address</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id={valueField.name}
              name={valueField.name}
              value={valueField.state.value.replace(/^mailto:/, "")}
              onChange={(e) =>
                valueField.handleChange(`mailto:${e.target.value}`)
              }
              aria-invalid={valueFieldIsInvalid}
              placeholder="contact@fooble.dev"
              autoComplete="off"
            />

            <InputGroupAddon>
              <EnvelopeIcon />
            </InputGroupAddon>
            <InputGroupAddon>
              <InputGroupText>mailto:</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {valueFieldIsInvalid && (
            <FieldError errors={valueField.state.meta.errors} />
          )}
        </Field>
      ) : preset === "wifi" ? (
        <Field data-invalid={valueFieldIsInvalid}>
          <FieldLabel htmlFor={valueField.name}>Wi-Fi details</FieldLabel>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput
                id={valueField.name}
                name={valueField.name}
                value={valueProps[0]}
                onChange={(e) => {
                  setValueProps([e.target.value, valueProps[1]]);

                  valueField.handleChange(
                    `WIFI:T:WPA;S:${e.target.value};P:${valueProps[1]};;`,
                  );
                }}
                aria-invalid={valueFieldIsInvalid}
                placeholder="MyNetwork"
                autoComplete="off"
              />

              <InputGroupAddon>
                <WifiHighIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupInput
                id={valueField.name}
                name={valueField.name}
                value={valueProps[1]}
                onChange={(e) => {
                  setValueProps([valueProps[0], e.target.value]);

                  valueField.handleChange(
                    `WIFI:T:WPA;S:${valueProps[0]};P:${e.target.value};;`,
                  );
                }}
                aria-invalid={valueFieldIsInvalid}
                placeholder="mypassword"
                autoComplete="off"
              />

              <InputGroupAddon>
                <PasswordIcon />
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>

          {valueFieldIsInvalid && (
            <FieldError errors={valueField.state.meta.errors} />
          )}
        </Field>
      ) : (
        preset === "location" && (
          <Field data-invalid={valueFieldIsInvalid}>
            <FieldLabel htmlFor={valueField.name}>Location data</FieldLabel>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput
                  id={valueField.name}
                  name={valueField.name}
                  value={valueProps[0]}
                  onChange={(e) => {
                    setValueProps([e.target.value, valueProps[1]]);

                    valueField.handleChange(
                      `geo:${e.target.value},${valueProps[1]}`,
                    );
                  }}
                  aria-invalid={valueFieldIsInvalid}
                  placeholder="37.334606"
                  autoComplete="off"
                />

                <InputGroupAddon>
                  <MapPinIcon />
                </InputGroupAddon>
                <InputGroupAddon>
                  <InputGroupText>Lat</InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup>
                <InputGroupInput
                  id={valueField.name}
                  name={valueField.name}
                  value={valueProps[1]}
                  onChange={(e) => {
                    setValueProps([valueProps[0], e.target.value]);

                    valueField.handleChange(
                      `geo:${valueProps[0]},${e.target.value}`,
                    );
                  }}
                  aria-invalid={valueFieldIsInvalid}
                  placeholder="-122.009102"
                  autoComplete="off"
                />

                <InputGroupAddon>
                  <MapPinIcon />
                </InputGroupAddon>
                <InputGroupAddon>
                  <InputGroupText>Long</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </ButtonGroup>

            {valueFieldIsInvalid && (
              <FieldError errors={valueField.state.meta.errors} />
            )}
          </Field>
        )
      )}

      <Field data-invalid={sizeFieldIsInvalid} orientation="horizontal">
        <FieldLabel htmlFor={sizeField.name}>Size</FieldLabel>

        <Slider
          id={sizeField.name}
          name={sizeField.name}
          value={sizeField.state.value}
          onValueChange={(value) => sizeField.handleChange(value)}
          aria-invalid={sizeFieldIsInvalid}
          max={256}
          min={16}
          step={8}
        />

        <FieldDescription className="w-16 text-right">
          {sizeField.state.value}
        </FieldDescription>
      </Field>
    </FieldSet>
  );
};

export default GeneralSettings;
