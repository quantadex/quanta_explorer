import axios from 'axios';
import qs from 'qs';

export default function request({
	url,
	method = 'get',
	baseUrl = process.env.REACT_APP_HORIZON_API_URL,
	params = {},
	headers = {},
	body = {},
	type = 'application/json',
	stringify = true,
	timeout = 20000,
}) {
	const apiUrl = `${baseUrl}/${url}`;

	const reqHeaders = {
		Accept: 'application/json',
		'Content-type': type,
		...headers,
	};

	const formattedBody = stringify
		? Object.keys(body).reduce((acc, key) => {
				acc[key] = typeof body[key] === 'object' ? JSON.stringify(body[key]) : body[key];
				return acc;
		  }, {})
		: body;
	return axios({
		method,
		url: apiUrl,
		data: stringify ? qs.stringify(formattedBody) : formattedBody,
		params,
		header: reqHeaders,
		timeout,
	});
}
