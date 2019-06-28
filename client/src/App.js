import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AsyncComponent from '@quanta/components/common/AsyncComponent';

import classes from './App.scss';

const AsyncDExplorer = AsyncComponent(() => import('@quanta/containers/pages/DExplorerContainer'));
const AsyncTransaction = AsyncComponent(() =>
	import('@quanta/containers/pages/TransactionContainer')
);
const AsyncOperations = AsyncComponent(() =>
	import('@quanta/containers/pages/OperationsContainer')
);
const AsyncAccount = AsyncComponent(() => import('@quanta/containers/pages/AccountContainer'));
const AsyncLedgers = AsyncComponent(() => import('@quanta/containers/pages/LedgersContainer'));
const AsyncLedger = AsyncComponent(() => import('@quanta/containers/pages/LedgerContainer'));
const AsyncHeader = AsyncComponent(() => import('@quanta/containers/common/HeaderContainer'));
const AsyncTools = AsyncComponent(() => import('@quanta/containers/pages/ToolsContainer'));
const AsyncGenerateKeys = AsyncComponent(() =>
	import('@quanta/containers/pages/GenerateKeysContainer')
);
const AsyncRequestFriendbot = AsyncComponent(() =>
	import('@quanta/containers/pages/RequestFriendbotContainer')
);
const AsyncDeployCrossChain = AsyncComponent(() =>
	import('@quanta/containers/pages/DeployCrossChainContainer')
);
const AsyncFooter = AsyncComponent(() => import('@quanta/components/common/Footer'));
const AsyncWitness = AsyncComponent(() => import('@quanta/components/pages/Witness'));
const AsyncCommittee = AsyncComponent(() => import('@quanta/components/pages/Committee'));
const AsyncCrosschain = AsyncComponent(() => import('@quanta/components/pages/Crosschain'));
const AsyncObject = AsyncComponent(() => import('@quanta/components/pages/Object'));
const AsyncAssets = AsyncComponent(() => import('@quanta/components/pages/Assets'));
const AsyncAsset = AsyncComponent(() => import('@quanta/components/pages/Asset'));

const App = () => (
	<div className={classes.app}>
		<AsyncHeader />
		<div className={classes.content}>
			<div className={classes.body}>
				<Switch>
					<Route exact path="/" component={AsyncDExplorer} />
					<Route exact path="/:network" component={AsyncDExplorer} />
					<Route exact path="/:network/operations" component={AsyncOperations} />
					<Route exact path="/:network/ledgers" component={AsyncLedgers} />
					<Route exact path="/:network/transactions/:id" component={AsyncTransaction} />
					<Route exact path="/:network/ledgers/:id" component={AsyncLedger} />
					<Route exact path="/:network/account/:id" component={AsyncAccount} />
					<Route exact path="/:network/tools" component={AsyncTools} />
					<Route exact path="/:network/tools/generate_keys" component={AsyncGenerateKeys} />
					<Route exact path="/:network/witness" component={AsyncWitness} />
					<Route exact path="/:network/committee" component={AsyncCommittee} />
					<Route exact path="/:network/object/:id" component={AsyncObject} />
					<Route exact path="/:network/crosschain/:id/:page" component={AsyncCrosschain} />
					<Route exact path="/:network/assets" component={AsyncAssets} />
					<Route exact path="/:network/asset/:id/:page" component={AsyncAsset} />
					<Route
						exact
						path="/:network/tools/request_friendbot"
						component={AsyncRequestFriendbot}
					/>
					<Route
						exact
						path="/:network/tools/deploy_crosschain"
						component={AsyncDeployCrossChain}
					/>
				</Switch>
			</div>
			<AsyncFooter />
		</div>
	</div>
);

export default App;
