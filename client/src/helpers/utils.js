import moment from 'moment';

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

export const abc = () => {};
