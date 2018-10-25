import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalBody } from 'reactstrap';
import ReactEventSource from 'react-eventsource';
import urlParse from 'url-parse';
import QRCode from 'qrcode-react';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import QuantaAddress from '@quanta/components/common/QuantaAddress';
import LabelText from '@quanta/components/common/LabelText';
import NoMatchesFound from '@quanta/components/common/NoMatchesFound';
import { dateToString } from '@quanta/helpers/utils';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import templateClasses from '@quanta/styles/template.scss';
import classes from './Account.scss';

class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'token',
			showQRModal: false,
		};

		this.operations = [];
	}

	selectTab = tab => {
		this.setState({
			activeTab: tab,
		});
	};

	componentDidMount() {
		const { fetchAccount, fetchAccountOperations } = this.props;
		const { id } = this.props.match.params;
		fetchAccount({ id });
		fetchAccountOperations({ id });
	}

	toggleQRModal = () => {
		const { showQRModal } = this.state;
		this.setState({
			showQRModal: !showQRModal,
		});
	};

	renderDetails = () => {
		const { account } = this.props;
		return (
			<div className={classNames(templateClasses.details, classes.accountDetails)}>
				<div className={classes.content}>
					<div className={classes.header}>
						<h2>Account</h2>
						<div
							className={classNames(classes.qrCode, 'show-sm')}
							onClick={this.toggleQRModal}
						>
							<QRCode value={account.id} size={68} />
						</div>
					</div>
					<Row>
						<Col sm={12} md={8} className={templateClasses.section}>
							<LabelText label="QUANTA ADDRESS" text={account.id} isLong />
						</Col>
						<Col
							sm={12}
							md={4}
							className={classNames(templateClasses.section, 'hidden-sm')}
						>
							<LabelText label="CREATED AT" text={dateToString(account.created_at)} />
						</Col>
					</Row>
				</div>
				<div
					className={classNames(classes.qrCode, 'hidden-sm')}
					onClick={this.toggleQRModal}
				>
					<QRCode value={account.id} size={151} />
				</div>
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
								href={urlParse(operation._links.transaction.href).pathname}
								className={operationsClasses.id}
							>
								{operation.id}
							</a>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
							</div>
							<div className={operationsClasses.created}>{`< ${moment(
								operation.created_at
							).toNow(true)} ago`}</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href={urlParse(operation._links.transaction.href).pathname}
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{`< ${moment(
									operation.created_at
								).toNow(true)} ago`}</div>
							</div>
							<div className={operationsClasses.description}>
								<OperationDescription operation={operation} />
							</div>
						</div>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	};

	renderOprationsHistory = () => {
		const { operations } = this.props;
		const { id } = this.props.match.params;
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
					{operations.length > 0 && (
						<ReactEventSource
							url={`${
								CONFIG.ENVIRONMENT.HORIZON_SERVER
							}/transactions/${id}/operations?order=asc&cursor=now`}
						>
							{events => {
								const streamOperations = events
									.map(event => JSON.parse(event))
									.sort((a, b) => timeDiff(a.created_at, 'ms', b.created_at));
								const streamOperationIds = streamOperations.map(
									operation => operation.id
								);

								if (this.operations.length === 0) {
									this.operations = operations;
								}

								const totalOperations = [
									...streamOperations,
									...this.operations.filter(
										operation => !streamOperationIds.includes(operation.id)
									),
								].sort((a, b) => timeDiff(a.created_at, 'ms', b.created_at));
								return this.renderOperationsRecord(
									totalOperations.slice(0, CONFIG.SETTINGS.RECENT_ITEM_LENGTH)
								);
							}}
						</ReactEventSource>
					)}
				</div>
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
			<div className="d-flex justify-content-between align-items-end">
				<div className={classes.label}>Issuer</div>
				{accountId === CONFIG.SETTINGS.QUANTA_ISSUER && (
					<div className={classes.issuer}>QUANTER ISSUER</div>
				)}
			</div>
			<QuantaAddress className={classes.text} address={accountId} showOriginal isLong />
		</React.Fragment>
	);

	renderToken = token => (
		<div className={classes.token}>
			<Row>
				<Col xs={4} sm={4} md={2} className={classNames(classes.tokenCell, classes.first)}>
					{this.renderLabelText(
						'Token',
						token.asset_type === 'native'
							? CONFIG.SETTINGS.ASSET_TYPE_NATIVE
							: token.asset_type
					)}
				</Col>
				<Col
					xs={8}
					sm={8}
					md={3}
					className={classNames(classes.tokenCell, classes.balance)}
				>
					{this.renderLabelText('Balance', token.balance)}
				</Col>
				<Col
					md={7}
					className={classNames(classes.tokenCell, classes.last, 'hidden-sm', {
						[classes.centerAligned]: token.asset_type === 'native',
					})}
				>
					{token.asset_type === 'native'
						? 'Native Token'
						: this.renderLabelTextIssuer(token.asset_issuer)}
				</Col>
			</Row>
			<div className={classNames(classes.tokenCell, classes.tokenIssuer, 'show-sm')}>
				{token.asset_type === 'native'
					? 'Native Token'
					: this.renderLabelTextIssuer(token.asset_issuer)}
			</div>
		</div>
	);

	renderTokens = () => {
		const { balances } = this.props.account;

		return (
			<div className={classNames(operationsClasses.history, classes.history)}>
				{(balances || []).map(balance => {
					return this.renderToken(balance);
				})}
			</div>
		);
	};

	renderTabs = () => {
		const { activeTab } = this.state;
		return (
			<div className={classNames(templateClasses.main, classes.main)}>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classNames(classes.tabs, {
								[classes.selected]: activeTab === 'token',
							})}
							onClick={() => this.selectTab('token')}
						>
							Tokens
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classNames(classes.tabs, classes.operation, {
								[classes.selected]: activeTab === 'operation',
							})}
							onClick={() => this.selectTab('operation')}
						>
							Operations
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="token">{this.renderTokens()}</TabPane>
					<TabPane tabId="operation">{this.renderOprationsHistory()}</TabPane>
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
		const { isFetching, account, hasError } = this.props;
		const { id } = this.props.match.params;
		if (hasError) {
			return <NoMatchesFound keyword={id} />;
		}

		return isFetching || !account ? (
			<React.Fragment />
		) : (
			<React.Fragment>
				{this.renderDetails()}
				{this.renderTabs()}
				{this.renderQRModal()}
			</React.Fragment>
		);
	}
}

const { func, shape, bool, arrayOf, object } = PropTypes;
Account.propTypes = {
	isFetching: bool.isRequired,
	account: shape({}).isRequired,
	operations: arrayOf(object).isRequired,
	hasError: bool.isRequired,
	fetchAccount: func.isRequired,
	fetchAccountOperations: func.isRequired,
};

Account.defaultProps = {};
export default Account;
