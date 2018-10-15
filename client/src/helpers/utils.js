import moment from 'moment';

const DATE_FORMAT = 'DD MMM YYYY hh:mm:ss z';

export const timeDiff = (fromString, unit = 'm', toString) => {
	const duration = toString
		? moment.duration(moment(toString).diff(moment(fromString)))
		: moment.duration(moment().diff(moment(fromString)));

	switch (unit) {
		case 'ms':
			return duration.asMilliseconds();
		default:
			return duration.asMinutes();
	}
};

export const dateToString = (dateString, isUTC = true) => {
	if (isUTC) {
		return moment.utc(dateString).format(DATE_FORMAT);
	} else {
		return moment(dateString).format(DATE_FORMAT);
	}
};
