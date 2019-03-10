import isString from "lodash/isString";

import moment, { Moment } from "moment";

type InitialValue = string;
type PicklistValue = InitialValue;

export function picklistValueToString(
  value: PicklistValue,
  valueFormat: string,
  locale: string
): string {
  if (isString(value)) {
    return value;
  }

  const date = moment(value, valueFormat);
  if (date.isValid()) {
    date.locale(locale);

    return date.format(valueFormat);
  }

  return "";
}
