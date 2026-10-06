export type Timezone = {
  timezone: string;
  utcOffset: string;
  name: string;
};

export const getTimezoneLabel = (timezone: Timezone): string =>
  `${timezone.name} (${timezone.utcOffset})`;

const parseCsvLine = (line: string): string[] => {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value.trim());
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
};

export const getTimezonesFromCSV = async (): Promise<Timezone[]> => {
  const response = await fetch("/timezone_list.csv");

  if (!response.ok) {
    throw new Error(`Unable to load timezone list (${response.status})`);
  }

  const lines = (await response.text())
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const timeZoneIndex = headers.indexOf("timezone");
  const utcOffsetIndex = headers.indexOf("utc offset");
  const nameIndex = headers.indexOf("name");

  if (timeZoneIndex === -1 || utcOffsetIndex === -1 || nameIndex === -1) {
    throw new Error("Timezone CSV has an invalid header");
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);

    return {
      timezone: values[timeZoneIndex],
      utcOffset: values[utcOffsetIndex],
      name: values[nameIndex],
    };
  });
};

export const getTimezoneLabels = (timezones: Timezone[]): string[] =>
  timezones.map(getTimezoneLabel);

export const labelToTimezone = (
  label: string,
  timezones: Timezone[],
): string | null => {
  const timezone = timezones.find((item) => getTimezoneLabel(item) === label);

  return timezone?.timezone ?? null;
};
