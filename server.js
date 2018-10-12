const express = require('express');

const app = express();
const cors = require('cors');
const axios = require('axios');
const CONFIG = require('./client/src/config');

app.use(cors());
const port = process.env.PORT || 5000;

app.get('/nodeCount', (req, res) => {
	const { network } = req.query;
	switch (network) {
		case 'Testnet':
		case 'Betanet':
			break;
		default:
			res.status(400).json({
				code: 'Bad Request',
				message: 'Invalid network!',
			});
			return;
	}

	axios({
		url: `${CONFIG.ENVRIONMENT[network].SERVER_URL}/peers`,
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

app.listen(port, () => console.log(`Listening on port ${port}`));
