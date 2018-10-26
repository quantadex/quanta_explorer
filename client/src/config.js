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
	QUANTA_ISSUER: 'QCISRUJ73RQBHB3C4LA6X537LPGSFZF3YUZ6MOPUOUJR5A63I5TLJML4',
	QUANTA_ORDERBOOK: 'QAHXFPFJ33VV4C4BTXECIQCNI7CXRKA6KKG5FP3TJFNWGE7YUC4MBNFB',
	ACCOUT_START_WITH: 'Q',
};

module.exports = {
	SETTINGS,
	ENVIRONMENT,
};
