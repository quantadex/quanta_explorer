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

export function timeAgo(t, adjust = 0) {
	const expr = new Date(t + "z");
	const old_date = new Date(expr.setFullYear(expr.getFullYear() - adjust));
	const now = new Date();
	const timeDiff = ((now.getTime() - old_date.getTime()) / 1000).toFixed(0)
	return timeDiff < 60 * 60 ? timeDiff + " seconds" :
		timeDiff < 60 * 60 * 24 ? Math.round(timeDiff / 60 / 60) + " hours" :
			Math.round(timeDiff / 60 / 60 / 24) + " days"
};

export const dateToString = (dateString, isUTC = true) => {
	if (isUTC) {
		return moment.utc(dateString).format(DATE_FORMAT);
	} else {
		return moment(dateString).format(DATE_FORMAT);
	}
};

export const localeString = (number, precision = 0) => {
	return number.toLocaleString(navigator.language, { minimumFractionDigits: precision })
};

var names = {}

function getName(id, Apis) {
	if (names[id] !== undefined) {
		return names[id]
	} else {
		return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
			names[id] = e[0].name
			return e[0].name
		})
	}
}

export async function operationData(op, Apis) {
	let type = op[0]
	let operation = op[1]
	let name1, name2, uid, uid2
	uid2 = false

	switch (type) {
		case 0:
			uid = operation.from
			uid2 = operation.to
			break
		case 1:
			uid = operation.seller
			break
		case 2:
			uid = operation.fee_paying_account
			break
		case 3:
			uid = operation.funding_account
			break
		case 4:
			uid = operation.account_id
			break
		case 5:
			uid = operation.registrar
			uid2 = operation.referrer
			break
		case 6:
			uid = operation.account
			break
		case 14:
			uid = operation.issuer
			uid2 = operation.issue_to_account
			break
		case 15:
			uid = operation.payer
			break
		case 19:
			uid = operation.publisher
			break
		case 22:
			uid = operation.fee_paying_account
			break
		case 23:
			uid = operation.fee_paying_account
			break
		case 33:
			uid = operation.owner_
			break
		case 37:
			uid = operation.deposit_to_account
			break
		case 49:
			uid = operation.account_id
			break
		case 50:
			uid = operation.account_id
			break

		default:
			throw op
	}

	if (uid) {
		name1 = await getName(uid, Apis)
	}
	if (uid2) {
		name2 = await getName(uid2, Apis)
	}

	return { name1: name1, name2: name2, type: type, data: operation }
}