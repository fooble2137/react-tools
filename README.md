# Tools

![MIT License](https://img.shields.io/badge/License-MIT-a6da95?style=for-the-badge&labelColor=363a4f)
![Version too-2.0](https://img.shields.io/badge/Version-too--2.0-f5a97f?style=for-the-badge&labelColor=363a4f)

A lightweight collection of browser-based utilities designed for generating and converting everyday digital assets. Built with React, Vite and TanStack Router, each tool is designed to run directly in the browser, eliminating the need for a backend.

## Overview

The app currently includes these tools:

- QR Code Generator
- Gradient Generator
- Password Generator
- Timezone Converter
- *Planned: File converter*

## Tool details

### QR Code generator

Generate QR Codes for URLs, text and other custom values.

- generate QR Codes from any text or URL
- adjust the size, colour and background appearance
- customise module styles and finder patterns
- add a logo or image overlay to create branded QR codes
- download the final QR code as a PNG image
- use built-in presets for quick setup

### Gradient generator

Create CSS-ready gradients for backgrounds, cards, landing pages and UI themes.

- choose a direction or custom angle
- add multiple colour stops and adjust their positions
- edit each colour manually
- preview the generated gradient in real time
- copy the resulting CSS code for immediate use in a project

### Password generator

Generate secure passwords according to your chosen rules.

- set the total password length
- include or exclude lowercase letters, uppercase letters, numbers, symbols and spaces
- minimise duplicate characters for more varied results
- copy passwords to the clipboard
- review a strength score that estimates how resistant the password is to common attacks

### Timezone Converter

Convert a given date and time to different time zones.

- select a date and time to convert
- choose both the source and destination time zones
- search a large list of valid time zones
- use the converter for travel, meetings, and scheduling across regions

## Project structure

- `src/routes`: screens for each tool
- `src/lib`: utility logic for QR, gradient, password, and timezone features
- `src/components`: reusable UI building blocks

## Notes

This project has been designed to be simple and client-side only. This makes it easy to add new utilities in the future without introducing unnecessary complexity to the backend.