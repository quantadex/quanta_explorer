const ENVIRONMENT = {
	TYPE: ['testnet', 'mainnet'],
	testnet: {
		SERVER_URL: 'http://testnet-02.quantachain.io:7000',
		REQUEST_FRIENDBOT: 'http://testnet-02.quantachain.io:8004',
		CROSSCHAING_ADDRESS: 'http://testnet-02.quantachain.io:5001/api/address',
		HORIZON_SERVER: 'http://testnet-02.quantachain.io:8000',

		WEBSOCKET_PATH: "wss://testnet-01.quantachain.io:8095",
		API_PATH: 'https://wya99cec1d.execute-api.us-east-1.amazonaws.com/testnet/',
		EXPLORER_URL: "http://testnet.quantadex.com",
		ETHERSCAN_URL: "https://ropsten.etherscan.io",
		BLOCKCYPHER_URL: "https://live.blockcypher.com/btc-testnet",
	},
	mainnet: {
		WEBSOCKET_PATH: "wss://mainnet-api.quantachain.io:8095",
		API_PATH: 'https://wya99cec1d.execute-api.us-east-1.amazonaws.com/mainnet/',
		EXPLORER_URL: "http://testnet.quantadex.com",
		ETHERSCAN_URL: "https://etherscan.io",
		BLOCKCYPHER_URL: "https://live.blockcypher.com/btc",
	}
};

const SETTINGS = {
	ACCOUNT_TRIM_LENGTH: 4,
	RECENT_ITEM_LENGTH: 8,
	ASSET_TYPE_NATIVE: 'QDEX',
	QUANTA_ISSUER: 'QCISRUJ73RQBHB3C4LA6X537LPGSFZF3YUZ6MOPUOUJR5A63I5TLJML4',
	QUANTA_ORDERBOOK: 'QAHXFPFJ33VV4C4BTXECIQCNI7CXRKA6KKG5FP3TJFNWGE7YUC4MBNFZ',
	ACCOUT_START_WITH: 'Q',
	CROSSCHAIN_ADDRESS: '0xBD770336fF47A3B61D4f54cc0Fb541Ea7baAE92d',
};

module.exports = {
	SETTINGS,
	ENVIRONMENT,
};
