import { getAllTimezones } from "countries-and-timezones";

export type Timezone = {
  timezone: string;
  utcOffset: string;
  name: string;
};

export const getTimezoneLabel = (timezone: Timezone): string =>
  `${timezone.name} (${timezone.utcOffset})`;

export const getTimezones = (): Timezone[] =>
  Object.values(getAllTimezones())
    .filter((timezone) => !timezone.deprecated)
    .map((timezone) => ({
      timezone: timezone.name,
      utcOffset: `UTC${timezone.utcOffsetStr}`,
      name: timezone.name,
    }))
    .sort((first, second) => first.name.localeCompare(second.name));

export const getTimezoneLabels = (timezones: Timezone[]): string[] =>
  timezones.map(getTimezoneLabel);

export const labelToTimezone = (
  label: string,
  timezones: Timezone[],
): string | null => {
  const timezone = timezones.find((item) => getTimezoneLabel(item) === label);

  return timezone?.timezone ?? null;
};

export const parseGMTOffset = (offset: string): string => {
  const match = offset.match(/Etc\/GMT([+-])(\d+)/);
  if (!match) {
    return "+00:00";
  }

  const sign = match[1] === "+" ? "-" : "+";
  const hours = match[2].padStart(2, "0");

  return `${sign}${hours}:00`;
};
