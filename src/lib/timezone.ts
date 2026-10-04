import timezones from "timezones-list";

export const timeZoneLabels = (): string[] => {
  const timezoneList =
    (timezones as unknown as { default?: typeof timezones }).default ??
    timezones;

  return timezoneList.map((timezone) => {
    const { name } = timezone;
    return name;
  });
};

export const labelToTimezone = (label: string): string | null => {
  const timezoneList =
    (timezones as unknown as { default?: typeof timezones }).default ??
    timezones;

  const timezone = timezoneList.find((tz) => tz.name === label);
  return timezone ? timezone.tzCode : null;
};
