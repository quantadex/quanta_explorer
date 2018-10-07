import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AsyncComponent from '@quanta/components/common/AsyncComponent';

import classes from './App.scss';

const AsyncDExplorer = AsyncComponent(() => import('@quanta/containers/pages/DExplorerContainer'));
const AsyncHeader = AsyncComponent(() => import('@quanta/containers/common/HeaderContainer'));
const AsyncFooter = AsyncComponent(() => import('@quanta/components/common/Footer'));

const App = () => (
	<div className={classes.app}>
		<AsyncHeader />
		<div className={classes.content}>
			<Switch>
				<Route exact path="/" component={AsyncDExplorer} />
			</Switch>
			<AsyncFooter />
		</div>
	</div>
);

export default App;
