export const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);
