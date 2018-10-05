import React from 'react';
import logo from './logo.svg';
import classes from './App.scss';

const App = () => (
	<div className={classes.app}>
		<header className={classes.appHeader}>
			<img src={logo} className={classes.appLogo} alt="logo" />
			<a
				className={classes.appLink}
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	</div>
);

export default App;
