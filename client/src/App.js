import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AsyncComponent from '@quanta/components/common/AsyncComponent';

import 'bootstrap/scss/bootstrap.scss';
import classes from './App.scss';

const AsyncDExplorer = AsyncComponent(() => import('@quanta/containers/pages/DExplorerContainer'));
const AsyncTransaction = AsyncComponent(() =>
	import('@quanta/containers/pages/TransactionContainer')
);
const AsyncOperations = AsyncComponent(() =>
	import('@quanta/containers/pages/OperationsContainer')
);
const AsyncLedgers = AsyncComponent(() => import('@quanta/containers/pages/LedgersContainer'));
const AsyncLedger = AsyncComponent(() => import('@quanta/containers/pages/LedgerContainer'));
const AsyncHeader = AsyncComponent(() => import('@quanta/containers/common/HeaderContainer'));
const AsyncFooter = AsyncComponent(() => import('@quanta/components/common/Footer'));

const App = () => (
	<div className={classes.app}>
		<AsyncHeader />
		<div className={classes.content}>
			<div className={classes.body}>
				<Switch>
					<Route exact path="/" component={AsyncDExplorer} />
					<Route exact path="/operations" component={AsyncOperations} />
					<Route exact path="/ledgers" component={AsyncLedgers} />
					<Route exact path="/transactions/:id" component={AsyncTransaction} />
					<Route exact path="/ledgers/:id" component={AsyncLedger} />
				</Switch>
			</div>
			<AsyncFooter />
		</div>
	</div>
);

export default App;
