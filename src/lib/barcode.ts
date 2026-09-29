export const barcodeTypes = [
  "CODE128",
  "EAN13",
  "EAN8",
  "UPC",
  "CODE39",
  "ITF14",
  "pharmacode",
] as const;

export type BarcodeType = (typeof barcodeTypes)[number];

export const getDefaultBarcodeText = (type: BarcodeType) => {
  switch (type) {
    case "CODE128":
      return "Hello World!";
    case "EAN13":
      return "123456789012";
    case "EAN8":
      return "1234567";
    case "UPC":
      return "12345678901";
    case "CODE39":
      return "HELLO-123";
    case "ITF14":
      return "1234567890123";
    case "pharmacode":
      return "12345";
    default:
      throw new Error(`Invalid barcode type: ${type}`);
  }
};

export const getFormatForBarcodeType = (type: BarcodeType) => {
  switch (type) {
    case "CODE128":
      return "All 128 ASCII characters";
    case "EAN13":
      return "12 digits";
    case "EAN8":
      return "7 digits";
    case "UPC":
      return "11 digits";
    case "CODE39":
      return "Uppercase letters, digits, and - . $ / + %";
    case "ITF14":
      return "13 digits";
    case "pharmacode":
      return "Digits between 3 and 131070";
    default:
      throw new Error(`Invalid barcode type: ${type}`);
  }
};

export const verifyBarcodeType = (text: string, type: BarcodeType) => {
  if (!barcodeTypes.includes(type)) {
    throw new Error(`Invalid barcode type: ${type}`);
  }

  if (type === "CODE128") {
    return true;
  }

  if (type === "EAN13") {
    if (!/^\d{12}$/.test(text)) {
      throw new Error("EAN13 barcode must be 12 digits long");
    }
    return true;
  }

  if (type === "EAN8") {
    if (!/^\d{7}$/.test(text)) {
      throw new Error("EAN8 barcode must be 7 digits long");
    }
    return true;
  }

  if (type === "UPC") {
    if (!/^\d{11}$/.test(text)) {
      throw new Error("UPC barcode must be 11 digits long");
    }
    return true;
  }

  if (type === "CODE39") {
    if (!/^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(text)) {
      throw new Error(
        "CODE39 barcode can only contain uppercase letters, digits, and the following characters: - . $ / + %",
      );
    }
    return true;
  }

  if (type === "ITF14") {
    if (!/^\d{13}$/.test(text)) {
      throw new Error("ITF14 barcode must be 13 digits long");
    }
    return true;
  }

  if (type === "pharmacode") {
    if (!/^\d+$/.test(text)) {
      throw new Error("Pharmacode barcode can only contain digits");
    }
    const number = parseInt(text, 10);
    if (number < 3 || number > 131070) {
      throw new Error(
        "Pharmacode barcode can only encode numbers between 3 and 131070",
      );
    }
    return true;
  }

  return false;
};
