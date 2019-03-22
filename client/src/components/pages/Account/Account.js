import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalBody } from 'reactstrap';
import QRCode from 'qrcode-react';

import config from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import QuantaAddress from '@quanta/components/common/QuantaAddress';
import LabelText from '@quanta/components/common/LabelText';
import NoMatchesFound from '@quanta/components/common/NoMatchesFound';
import { dateToString, operationData, timeAgo } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import templateClasses from '@quanta/styles/template.scss';
import classes from './Account.scss';
import lodash from 'lodash';
import { Apis } from "@quantadex/bitsharesjs-ws";

var dataSize = 100

class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'balance',
			showQRModal: false,
			accountInfo: undefined,
			operations: [],
			loading: false,
			end: false,
			page: 0
		};

		this.operations = [];
	}

	selectTab = tab => {
		this.setState({
			activeTab: tab,
		});
	};

	getName(id) {
		return Apis.instance().db_api().exec("get_accounts", [[id]]).then(e => {
			return e[0].name
		})
	}

	getAccount(id) {
		this.setState({
			operations: [],
			isFetching: true,
			hasError: false,
			loading: false,
			end: false,
			page: 0
		})
		Apis.instance().db_api().exec("get_full_accounts", [[id.toLowerCase()], false]).then(async e => {
			// console.log(e[0][1])
			const acc_data = e[0][1].account
			const accInfo = { name: acc_data.name, id: acc_data.id, address: [acc_data.owner.key_auths[0][0], acc_data.active.key_auths[0][0]] }
			const issuer = {}

			for (let asset of e[0][1].balances) {
				let name = await this.getName(window.assets[asset.asset_type].issuer)
				issuer[asset.asset_type] = name
			}

			this.setState({ accountInfo: accInfo, accountBalance: e[0][1].balances, issuer: issuer })

			fetch(config.getEnv().API_PATH + "account?operation_type=5&size=1&account_id=" + acc_data.id)
				.then(e => e.json())
				.then(data => {
					if (data.length == 0) {
						this.setState({ registeredTimes: 0, isFetching: false })
						return
					}
					const time = new Date(data[0].block_data.block_time)
					this.setState({ registeredTimes: time, isFetching: false })
				})

			this.getOpHistory(0)
		}).catch(e => {
			// console.log(e)
			this.setState({ hasError: true })
		})

	}

	getOpHistory(page) {
		this.setState({ loading: true })
		fetch(config.getEnv().API_PATH + `account?size=${dataSize}&account_id=${this.state.accountInfo.id}&from_=${page * dataSize}`)
			.then(e => e.json())
			.then(async (data) => {
				const opList = []
				for (var item of data) {
					let opData
					try {
						opData = await operationData([item.operation_type, item.operation_history.op_object], Apis)
						// console.log(opData)
					} catch (e) {
						// console.log(e)
						opData = { type: item.operation_type }
					}
					let blockData = { block: item.block_data.block_num, timestamp: item.block_data.block_time, id: item.account_history.operation_id }
					opList.push({ ...opData, ...blockData })
				}

				this.setState({
					operations: this.state.operations.concat(opList),
					loading: false,
					page: page + 1,
					end: data.length < dataSize
				})
			})
	}

	handleScroll = lodash.throttle((e) => {
		if (this.state.loading || this.state.end) {
			return
		}
		if (this.state.activeTab === 'operation' && window.scrollY > document.body.scrollHeight - (window.outerHeight + 500)) {
			this.getOpHistory(this.state.page)
		}
	}, 200)

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.props.match.params.id) {
			this.getAccount(nextProps.match.params.id)
		}
	}
	componentDidMount() {
		Apis.instance(config.getEnv().WEBSOCKET_PATH, true, 3000, { enableOrders: false }).init_promise.then(e => {
			Apis.instance().db_api().exec("list_assets", ["A", 100]).then((assets) => {
				// console.log("assets ", assets);
				window.assets = lodash.keyBy(assets, "id")
				window.assetsBySymbol = lodash.keyBy(assets, "symbol")
				return assets;
			}).then(e => {
				const { id } = this.props.match.params;
				this.getAccount(id)
			})
		})
	}

	toggleQRModal = () => {
		const { showQRModal } = this.state;
		this.setState({
			showQRModal: !showQRModal,
		});
	};

	renderDetails = () => {
		// const { account } = this.props;
		return (
			<div className={classNames(templateClasses.details, classes.accountDetails)}>
				<div className={classes.content}>
					<div className={classes.header}>
						<h2>{this.state.accountInfo.name} | {this.state.accountInfo.id}</h2>
						{/* <div
							className={classNames(classes.qrCode, 'show-sm')}
							onClick={this.toggleQRModal}
						>
							<QRCode value={account.id} size={68} />
						</div> */}
					</div>
					<Row>
						<Col sm={12} md={8} className={templateClasses.section}>
							<LabelText label="QUANTA ADDRESS" text={<span>Owner: {this.state.accountInfo.address[0]}<br />Active: {this.state.accountInfo.address[1]}</span>} isLong />
						</Col>
						<Col
							sm={12}
							md={4}
							className={classNames(templateClasses.section, 'hidden-sm')}
						>
							<LabelText label="CREATED AT" text={dateToString(this.state.registeredTimes)} />
						</Col>
					</Row>
				</div>
				{/* <div
					className={classNames(classes.qrCode, 'hidden-sm')}
					onClick={this.toggleQRModal}
				>
					<QRCode value={account.id} size={151} />
				</div> */}
			</div>
		);
	};

	renderOperationsRecord = operations => {
		return (
			<React.Fragment>
				{operations.map(operation => (
					<React.Fragment key={operation.id}>
						<div className={classNames(tableClasses.body, 'hidden-sm')}>
							<a
								href={"/" + this.props.match.params.network + "/ledgers/" + operation.block}
								className={operationsClasses.id}
							>
								{operation.block}
							</a>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} env={"/" + this.props.match.params.network} />
							</div>
							<div className={operationsClasses.created}>{timeAgo(operation.timestamp)} ago</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href={"/" + this.props.match.params.network + "/object/" + operation.id}
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{timeAgo(operation.timestamp)} ago</div>
							</div>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} env={"/" + this.props.match.params.network} />
							</div>
						</div>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	};

	renderOperationsHistory = () => {
		const { operations } = this.state;
		// const { id } = this.props.match.params;
		return (
			<div className={classNames(operationsClasses.history, classes.history)}>
				<div className={operationsClasses.header}>
					<h2>Operations History</h2>
				</div>
				<div className={tableClasses.table}>
					<div className={classNames(tableClasses.header, 'hidden-sm')}>
						<div className={operationsClasses.id}>Id</div>
						<div className={operationsClasses.description} />
						<div className={operationsClasses.created}>Created</div>
					</div>
					{operations.length > 0 && this.renderOperationsRecord(operations)}
				</div>
				{this.state.loading && <div className="text-center mt-3">Loading...</div>}
			</div>
		);
	};

	renderLabelText = (label, text) => (
		<React.Fragment>
			<div className={classes.label}>{label}</div>
			<div className={classes.text}>{text}</div>
		</React.Fragment>
	);

	renderLabelTextIssuer = accountId => (
		<React.Fragment>
			<div className={classes.label}>Issuer</div>
			<QuantaAddress className={classes.text} address={accountId} env={this.props.match.params.network} showOriginal isLong />
		</React.Fragment>
	);

	renderToken = token => (
		<div key={token.asset_type} className={classes.token}>
			<Row>
				<Col xs={4} sm={4} md={2} className={classNames(classes.tokenCell, classes.first)}>
					{this.renderLabelText(
						'Token',
						window.assets[token.asset_type].symbol
					)}
				</Col>
				<Col
					xs={8}
					sm={8}
					md={3}
					className={classNames(classes.tokenCell, classes.balance)}
				>
					{this.renderLabelText('Balance', (token.balance / Math.pow(10, window.assets[token.asset_type].precision)))}
				</Col>
				<Col
					md={3}
					className={classNames(classes.tokenCell, 'hidden-sm', {
						[classes.centerAligned]: token.asset_type === 'native',
					})}
				>
					{this.state.issuer[token.asset_type] === 'null-account'
						? 'Native Token'
						: this.renderLabelTextIssuer(this.state.issuer[token.asset_type])}
				</Col>
			</Row>
			<div className={classNames(classes.tokenCell, classes.tokenIssuer, 'show-sm')}>
				{token.asset_code === 'ETH' &&
					token.asset_issuer === config.SETTINGS.QUANTA_ISSUER &&
					this.renderLabelText(
						'Deposit Address',
						this.props.crossChainAddress.map(address => (
							<a href={`https://ropsten.etherscan.io/address/${address}`}>
								{address}
							</a>
						))
					)}
			</div>
			<div className={classNames(classes.tokenCell, classes.tokenIssuer, 'show-sm')}>
				{token.asset_type === 'native'
					? 'Native Token'
					: this.renderLabelTextIssuer(token.asset_issuer ? token.asset_issuer : '')}
			</div>
		</div>
	);

	renderTokens = () => {
		let balances = this.state.accountBalance;

		balances = balances || [];

		return (
			<div className={classNames(operationsClasses.history, classes.history)}>
				{balances.map(balance => {
					return this.renderToken(balance);
				})}
			</div>
		);
	};

	renderSigners = () => {
		const { account } = this.props;

		return (
			<div className={classNames(operationsClasses.history, classes.history)}>
				{account.thresholds && (
					<div className={classes.signers}>
						<div className={classes.item}>
							Low Threadhold:{' '}
							<span className={classes.value}>
								{account.thresholds.low_threshold}
							</span>
						</div>
						<div className={classes.item}>
							Medium Threadhold:{' '}
							<span className={classes.value}>
								{account.thresholds.med_threshold}
							</span>
						</div>
						<div className={classes.item}>
							High Threadhold:{' '}
							<span className={classes.value}>
								{account.thresholds.high_threshold}
							</span>
						</div>
					</div>
				)}
				<div className={tableClasses.table}>
					<div className={tableClasses.header}>
						<div className={classes.publicKey}>Public Key</div>
						<div className={classes.weight}>Weight</div>
					</div>
					{(account.signers || []).map(signer => (
						<div className={tableClasses.body}>
							<div className={classes.publicKey}>{signer.public_key}</div>
							<div className={classes.weight}>{signer.weight}</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	renderTabs = () => {
		const { activeTab } = this.state;
		return (
			<div className={classNames(templateClasses.main, classes.main)} onWheel={(e) => this.handleScroll(e.target)}>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classNames(classes.tabs, {
								[classes.selected]: activeTab === 'balance',
							})}
							onClick={() => this.selectTab('balance')}
						>
							Balance
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classNames(classes.tabs, {
								[classes.selected]: activeTab === 'operation',
							})}
							onClick={() => this.selectTab('operation')}
						>
							Operations
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classNames(classes.tabs, classes.tabSigners, {
								[classes.selected]: activeTab === 'signers',
							})}
							onClick={() => this.selectTab('signers')}
						>
							Signers
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="balance">{this.renderTokens()}</TabPane>
					<TabPane tabId="operation">{this.renderOperationsHistory()}</TabPane>
					<TabPane tabId="signers">{this.renderSigners()}</TabPane>
				</TabContent>
			</div>
		);
	};

	renderQRModal = () => (
		<Modal
			className={classes.qrModal}
			isOpen={this.state.showQRModal}
			toggle={this.toggleQRModal}
			centered
		>
			<ModalBody className={classes.qrModal__Body}>
				<div className={classes.qrModal__Header}>
					<span onClick={this.toggleQRModal}>X Close</span>
				</div>
				<QRCode value={this.props.account.id} size={310} />
			</ModalBody>
		</Modal>
	);

	render() {
		const { id } = this.props.match.params;
		if (this.state.hasError) {
			return <NoMatchesFound keyword={id} />;
		}

		return this.state.isFetching || !this.state.accountInfo ? (
			<React.Fragment />
		) : (
				<React.Fragment>
					{this.renderDetails()}
					{this.renderTabs()}
					{/* {this.renderQRModal()} */}
				</React.Fragment>
			);
	}
}

const { func, shape, bool, arrayOf, object, string } = PropTypes;
Account.propTypes = {
	isFetching: bool.isRequired,
	account: shape({}).isRequired,
	operations: arrayOf(object).isRequired,
	hasError: bool.isRequired,
	fetchAccount: func.isRequired,
	fetchAccountOperations: func.isRequired,
	environmentType: shape({}).isRequired,
	crossChainAddress: arrayOf(string).isRequired,
};

Account.defaultProps = {};
export default Account;
