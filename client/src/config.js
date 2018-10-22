const ENVIRONMENT = {
	TYPE: ['testnet', 'betanet'],
	SERVERS: {
		testnet: {
			SERVER_URL: 'http://testnet-02.quantachain.io:7000',
		},
		betanet: {},
	},
	HORIZON_SERVER: 'http://testnet-02.quantachain.io:8000',
};

const SETTINGS = {
	ACCOUNT_TRIM_LENGTH: 4,
	RECENT_ITEM_LENGTH: 8,
	ASSET_TYPE_NATIVE: 'QDEX',
	QUANTA_ISSUER: 'QD5WLLS33NCP7Q4DRTJLGS5NT6GVVJWHC22QGCIBB2W72LIAJYCPEG5A',
	ACCOUT_START_WITH: 'Q',
};

module.exports = {
	SETTINGS,
	ENVIRONMENT,
};
