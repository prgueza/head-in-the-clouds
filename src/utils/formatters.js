import dayjs from "dayjs";

export const withUnits = (value, unit) => `${value || "-"} ${unit}`;
export const asDate = (
  date,
  outputFormat = "MMMM D, YYYY",
  inputFormat = ""
) => {
  if (!date || !dayjs(date, inputFormat).isValid()) return "-";
  return dayjs(date, inputFormat).format(outputFormat);
};
