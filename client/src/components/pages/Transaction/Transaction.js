import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import ReactEventSource from 'react-eventsource';
import urlParse from 'url-parse';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import LabelText from '@quanta/components/common/LabelText';
import { dateToString } from '@quanta/helpers/utils';
import { timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import classes from '@quanta/styles/template.scss';

class Transaction extends Component {
	componentDidMount() {
		const { fetchTransaction, fetchTransactionOperations } = this.props;
		const { id } = this.props.match.params;
		fetchTransaction({ id });
		fetchTransactionOperations({ id });

		this.operations = [];
	}

	renderDetails = () => {
		const { transaction } = this.props;
		return (
			<div className={classes.details}>
				<h2>Transaction</h2>
				<Row>
					<Col sm={12} md={7} className={classes.section}>
						<LabelText label="ID" text={transaction.id} isLong />
					</Col>
					<Col xs={5} sm={5} md={2} className={classes.section}>
						<LabelText label="LEDGER" text={transaction.ledger} />
					</Col>
					<Col xs={7} sm={7} md={3} className={classes.section}>
						<LabelText label="CREATED AT" text={dateToString(transaction.created_at)} />
					</Col>
				</Row>
				<Row>
					<Col sm={12} md={7} className={classes.section}>
						<LabelText label="ACCOUNT" text={transaction.source_account} isLong />
					</Col>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="TRANSACTION FEE" text={transaction.fee_paid} />
					</Col>
					<Col xs={6} sm={6} md={3} className={classes.section}>
						<LabelText label="SEQUENCE NUMBER" text={transaction.paging_token} />
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<LabelText
							label="SIGNATURES"
							text={transaction.signatures && transaction.signatures[0]}
							isLong
						/>
					</Col>
				</Row>
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
							<div className={operationsClasses.created}>{`<  ${Math.ceil(
								timeDiff(operation.created_at)
							)} min ago`}</div>
						</div>
						<div className={classNames(tableClasses.body, 'show-sm', 'flex-column')}>
							<div className="d-flex justify-content-between w-100">
								<a
									href={urlParse(operation._links.transaction.href).pathname}
									className={operationsClasses.id}
								>
									{operation.id}
								</a>
								<div className={operationsClasses.created}>{`<  ${Math.ceil(
									timeDiff(operation.created_at)
								)} min ago`}</div>
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
			<div className={classNames(operationsClasses.history)}>
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

	render() {
		const { isFetching, transaction, hasError } = this.props;

		if (hasError) {
			return <div className={classes.noFound}>No transaction found.</div>;
		}

		return isFetching || !transaction ? (
			<React.Fragment />
		) : (
			<React.Fragment>
				{this.renderDetails()}
				<div className={classes.main}>{this.renderOprationsHistory()}</div>
			</React.Fragment>
		);
	}
}

const { func, string, shape, bool, arrayOf, object } = PropTypes;
Transaction.propTypes = {
	match: shape({
		params: {
			id: string.isRequired,
		},
	}).isRequired,
	fetchTransaction: func.isRequired,
	fetchTransactionOperations: func.isRequired,
	transaction: shape({}),
	operations: arrayOf(object),
	isFetching: bool.isRequired,
	hasError: bool.isRequired,
};

Transaction.defaultProps = {
	transaction: null,
	operations: [],
};
export default Transaction;
