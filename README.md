# Tools

![MIT License](https://img.shields.io/badge/License-MIT-a6da95?style=for-the-badge&labelColor=363a4f)
![Version too-3.0](https://img.shields.io/badge/Version-too--3.0-f5a97f?style=for-the-badge&labelColor=363a4f)

A collection of **browser-based utilities** designed for **generating and converting everyday digital assets**. Built using **React, Vite and TanStack Router**, each tool runs **directly in the browser**, eliminating the need for a backend. The project relies heavily on **shadcn/ui**.

## QR Code generator

The QR Code Generator creates a **scannable PNG** from a URL, piece of text or other **QR-compatible data**. As it runs **entirely in the browser**, the value and settings are **not sent to a server**.

### How to use it

1. Open the [**QR Code generator**](https://tools.fooble.dev/qr-code).
2. In the **General** section, enter the value to be encoded and select the size.
3. Use the other sections to customise the QR Code:
   - **Background**: Set a solid background colour or make the background transparent.
   - **Data modules**: Change the colour and shape of the data pixels. Some shapes support variable sizes and line widths.
   - **Finder patterns outer** and **Finder patterns inner**: Change the colour and shape of the finder patterns.
   - **Image**: Optionally add a logo or other image to the centre. You can also adjust the source URL and dimensions.
4. Check the live preview to see if it is readable.
5. Select **'Download PNG'** to save a PNG file.

The value **must not be left blank**. The preview and download controls are **disabled while the form is invalid**.

### How it works

The route stores **all controls in a TanStack Form**. Every change is **validated with Zod** and passed to `@lglab/react-qr-code`, which **immediately renders the QR code in React**. Until validation succeeds, an empty or whitespace-only value is shown using the default **'https://fooble.dev'** value.

### Supported input formats

**Any text can be encoded.** The app provides **presets with examples**. Each preset displays a **different input field**. The current presets and examples are:

- **URL or plain text**: `https://fooble.dev`
- **Phone**: `tel:+493023125000` _(blocked example phone number)_
- **Email**: `mailto:contact@fooble.dev`
- **Wi-Fi**: `WIFI:T:WPA;S:MyNetwork;P:mypassword;;`
- **Location**: `geo:37.334606,-122.009102`

## Gradient generator

The Gradient Generator creates a **CSS linear gradient** based on a direction and **two or more colour stops**. It provides a **live preview** and generates **CSS code** that can be copied directly into a stylesheet or inline style.

### How to use it

1. Open the [**Gradient generator**](https://tools.fooble.dev/gradient).
2. In **'Direction'**, choose a **preset direction** such as 'To right' or 'To bottom left'. Select **'Custom angle'** to enter an angle between **0 and 360 degrees**.
3. In **'Colours'**, you can edit the **hex colour** and **position of each stop** from 0% to 100%.
4. Select **'Add colour'** to insert another stop. **Remove extra stops** using their colour-stop controls (at least **two stops are required**).
5. Select **'Randomize colours'** to replace every stop colour with a **randomly generated six-digit hex colour**, while **preserving positions**.
6. Copy the generated CSS using **'Copy CSS'**.

The preview, generated CSS field and action buttons all reflect the **current valid state** of the form. Validation reports **invalid colours, positions, angles or too few stops**.

### How it works

The tool retains the **direction and degree**, as well as an **ordered array of stop objects**, in TanStack Form. Each stop has a **local numeric ID**, a **validated hex colour** and a **percentage position**. The CSS is **assembled in the browser** as follows:

```css
background: linear-gradient(direction, color1 position1%, color2 position2%);
```

Preset directions are emitted as **CSS direction keywords**. A custom direction is emitted as an **angle**, for example, `linear-gradient(135deg, #8E3DFF 0%, #FF3D8E 100%)`. **No CSS is generated or stored remotely.**

New stops are assigned a **random colour** and placed **ten percentage points after the previous stop**, up to a maximum of 100%. Random colours are generated using **`Math.random()`** and formatted as **six-digit hexadecimal values**.

## Password generator

The Password Generator creates **passwords locally** from selectable character types and provides an **approximate strength score**. It **does not save or send generated passwords to a backend**.

### How to use it

1. Open the [**Password Generator**](https://tools.fooble.dev/password).
2. Set the **length** to between 4 and 32 characters.
3. Select the **character types** to include:
   - **lowercase letters**: `a-z`
   - **uppercase letters**: `A-Z`
   - **numbers**: `0-9`
   - **symbols**: common punctuation such as `!@#$%^&*`
   - **whitespace**: a literal space
4. Enable **'Minimise duplicate characters'** to avoid repeated characters.
5. Review the generated password and its **strength indicator**.
6. Select **'Copy'** or **'Regenerate'** to create a different password with the same settings.

Changing any setting **automatically generates a new password**. If all four primary character categories (**lowercase, uppercase, numbers and symbols**) are disabled, the password generator returns an **empty value**. **Whitespace alone** is not treated as a primary category.

### How it works

The generator creates a **pool of characters** from the enabled lowercase, uppercase, number, symbol and whitespace sets. It then **selects random characters** from that pool until the requested length is reached. When duplicate minimisation is enabled, **characters that are already present are skipped** and the requested length is capped at the number of available unique characters.

The strength indicator provides an **estimate of security, not a guarantee**. It starts with a length-based value, then adds points for **character variety and unique characters**. Points are subtracted for **repeated characters, repeated substrings, ascending or descending sequences, keyboard patterns and common passwords**. Scores are clamped to **0–100** and mapped to: **Very Weak, Weak, Fair, Good, Strong, or Excellent**.

Password generation uses the browser's **`Math.random()`** implementation. For secrets requiring **cryptographic randomness**, use a dedicated password manager or a cryptographically secure generator instead.

## Timezone converter

The Timezone Converter converts a **given date and time between time zones**. It uses the **IANA time zone database** and accounts for **daylight saving time** when calculating the target time.

### How to use it

1. Open the [**Time Zone Converter**](https://tools.fooble.dev/timezone).
2. Under **'Time & Date'**, select a date and 24-hour time.
3. Under **'Time zones'**, select the **source and destination time zones** using the searchable selectors.
4. Read the **converted result** shown below the controls.
5. Click the **'Details'** button next to the result to view the source and target values alongside their **IANA time zone identifiers**.
6. Select **'Switch time zones'** to exchange the source and destination selections.

A result will only be shown once the **date, time, and time zone selections are valid**. Times must follow the **`HH:mm` format**, ranging from **`00:00` to `23:59`**.

### How it works

When the app starts up, it loads **non-deprecated time zones** from the `countries-and-timezones` file, maps each zone to a label containing its **current displayed UTC offset**, and sorts the list by **time zone name**. The selected label is then converted back to its **IANA identifier** for calculation.

The selected local date and time are passed to the `fromZonedTime` function in `date-fns-tz`, which resolves them to **one instant**. This instant is then formatted in the source and destination zones using the `formatInTimeZone` function. This means the conversion uses the **time zone rules for the selected date**, including **daylight saving changes**. The displayed selector offset is a label and may not reflect a seasonal offset change; the interface **explicitly calls this out**.

Special `Factory` and `Etc/GMT` entries are **normalised before conversion**. `Factory` is treated as **UTC**, while `Etc/GMT` offsets are converted to the **sign convention used by the converter**.
