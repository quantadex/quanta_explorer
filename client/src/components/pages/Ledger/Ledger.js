import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import ReactEventSource from 'react-eventsource';
import urlParse from 'url-parse';

import CONFIG from '@quanta/config';
import OperationDescription from '@quanta/components/common/OperationDescription';
import LabelText from '@quanta/components/common/LabelText';
import { dateToString, timeDiff } from '@quanta/helpers/utils';
import tableClasses from '@quanta/styles/tables.scss';
import operationsClasses from '@quanta/styles/operations.scss';
import classes from '@quanta/styles/template.scss';

class Ledger extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		const { fetchLedger, fetchLedgerOperations } = this.props;

		fetchLedger({ id });
		fetchLedgerOperations({ id });
		this.operations = [];
	}

	renderDetails = () => {
		const { ledger } = this.props;
		return (
			<div className={classes.details}>
				<h2>Ledger</h2>
				<Row>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="SEQUENCE" text={ledger.sequence} />
					</Col>
					<Col md={7} className={classNames(classes.section, 'hidden-sm')}>
						<LabelText label="HASH" text={ledger.hash} isLong />
					</Col>
					<Col xs={6} sm={6} md={3} className={classes.section}>
						<LabelText label="CLOSED AT" text={dateToString(ledger.closed_at)} />
					</Col>
					<Col xs={12} sm={12} className={classNames(classes.section, 'show-sm')}>
						<LabelText label="HASH" text={ledger.hash} isLong />
					</Col>
				</Row>
				<Row>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="TRANSACTIONS" text={ledger.transaction_count} />
					</Col>
					<Col xs={6} sm={6} md={2} className={classes.section}>
						<LabelText label="OPERATIONS" text={ledger.operation_count} />
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
					{operations.length > 0 &&
						this.operations && (
							<ReactEventSource
								url={`${
									CONFIG.ENVIRONMENT.HORIZON_SERVER
								}/ledgers/${id}/operations?order=asc&cursor=now`}
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
		const { isFetching, ledger } = this.props;
		return isFetching || !ledger ? (
			<React.Fragment />
		) : (
			<React.Fragment>
				{this.renderDetails()}
				<div className={classes.main}>{this.renderOprationsHistory()}</div>
			</React.Fragment>
		);
	}
}

const { func, shape, bool, arrayOf, object } = PropTypes;
Ledger.propTypes = {
	fetchLedger: func.isRequired,
	fetchLedgerOperations: func.isRequired,
	ledger: shape({}).isRequired,
	isFetching: bool.isRequired,
	operations: arrayOf(object),
};

Ledger.defaultProps = {
	operations: [],
};
export default Ledger;
