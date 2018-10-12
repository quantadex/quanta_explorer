const CONFIG = {
	TYPE: ['Testnet', 'Betanet'],
	ENVRIONMENT: {
		Testnet: {
			SERVER_URL: 'http://testnet-02.quantachain.io:7000',
		},
		Betanet: {},
	},
	HORIZON_SERVER: 'https://horizon-testnet.stellar.org',
	TRIM_LENGTH: 4,
	ASSET_TYPE_NATIVE: 'QDEX',
	QUANTA_ISSUER: 'QXBCCCXXX',
	LOCAL_BACKEND: 'http://localhost:5000',
};

module.exports = CONFIG;
