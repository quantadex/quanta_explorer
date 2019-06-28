const ENVIRONMENT = {
	TYPE: ['testnet', 'mainnet'],
	testnet: {
		SERVER_URL: 'http://testnet-02.quantachain.io:7000',
		REQUEST_FRIENDBOT: 'http://testnet-02.quantachain.io:8004',
		CROSSCHAING_ADDRESS: 'http://testnet-02.quantachain.io:5001/api/address',
		HORIZON_SERVER: 'http://testnet-02.quantachain.io:8000',

		WEBSOCKET_PATH: "wss://testnet-01.quantachain.io:8095",
		API_PATH: 'https://wya99cec1d.execute-api.us-east-1.amazonaws.com/testnet/',
		EXPLORER_URL: "http://explorer.quantadex.com/testnet",
		ETHERSCAN_URL: "https://ropsten.etherscan.io",
		BLOCKCYPHER_URL: "https://live.blockcypher.com/",
		BITCOIN_URL: "https://explorer.bitcoin.com/t",
		CROSSCHAIN_ADDRESS: '0xBD770336fF47A3B61D4f54cc0Fb541Ea7baAE92d',
	},
	mainnet: {
		WEBSOCKET_PATH: "wss://mainnet-lb.quantachain.io",
		API_PATH: 'https://wya99cec1d.execute-api.us-east-1.amazonaws.com/mainnet/',
		EXPLORER_URL: "http://explorer.quantadex.com/mainnet",
		ETHERSCAN_URL: "https://etherscan.io",
		BLOCKCYPHER_URL: "https://live.blockcypher.com/",
		BITCOIN_URL: "https://explorer.bitcoin.com/",
		CROSSCHAIN_ADDRESS: '0xF8306d5279193146F307dc1c170EA59e7b0C370A',
	}
};

const SETTINGS = {
	ACCOUNT_TRIM_LENGTH: 4,
	RECENT_ITEM_LENGTH: 8,
	ASSET_TYPE_NATIVE: 'QDEX',
	QUANTA_ISSUER: 'QCISRUJ73RQBHB3C4LA6X537LPGSFZF3YUZ6MOPUOUJR5A63I5TLJML4',
	QUANTA_ORDERBOOK: 'QAHXFPFJ33VV4C4BTXECIQCNI7CXRKA6KKG5FP3TJFNWGE7YUC4MBNFZ',
	ACCOUT_START_WITH: 'Q',
};

function getEnv() {
	// what is the env
	// pick the right baseUrl
	if (window.location.pathname.startsWith("/testnet")) {
		return ENVIRONMENT.testnet
	} else {
		return ENVIRONMENT.mainnet
	}
}

module.exports = {
	SETTINGS,
	ENVIRONMENT,
	getEnv
};
