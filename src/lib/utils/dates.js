const dateFormater = (options) => new Intl.DateTimeFormat('hr-HR', options);

export const formatDate = (date, options) => dateFormater(options).format(new Date(date));
