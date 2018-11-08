const express = require('express');

const app = express();
const path = require('path');
const axios = require('axios');
const CONFIG = require('./client/src/config');

app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;

app.get('/nodeCount', (req, res) => {
	const { network } = req.query;
	switch (network) {
		case 'testnet':
		case 'betanet':
			break;
		default:
			res.status(400).json({
				code: 'Bad Request',
				message: 'Invalid network!',
			});
			return;
	}

	axios({
		url: `${CONFIG.ENVIRONMENT.SERVERS[network].SERVER_URL}/peers`,
		method: 'get',
	})
		.then(response => {
			const { authenticated_peers } = response.data;
			res.status(200).json({
				numberOfNodes: authenticated_peers ? authenticated_peers.length + 1 : 1,
			});
		})
		.catch(() => {
			res.status(500).json({
				code: 'Interval server error',
				message: 'Something went wrong!',
			});
		});
});

app.get('/crosschain/eth/:id', (req, res) => {
	const { network } = req.query;
	const { id } = req.params;

	switch (network) {
		case 'testnet':
		case 'betanet':
			break;
		default:
			res.status(400).json({
				code: 'Bad Request',
				message: 'Invalid network!',
			});
			return;
	}

	const proxyUrl = `${CONFIG.ENVIRONMENT.SERVERS[network].CROSSCHAING_ADDRESS}/eth/${id}`;
	axios({
		url: proxyUrl,
		method: 'get',
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			console.log("Caught error: err=" + err + ", proxyUrl=" + proxyUrl);
			res.status(500).json({
				code: 'Interval server error',
				message: 'Something went wrong! err=' + err,
			});
		});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
