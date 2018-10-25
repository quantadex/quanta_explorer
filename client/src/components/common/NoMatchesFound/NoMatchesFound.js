import React from 'react';
import PropTypes from 'prop-types';

import classes from './NoMatchesFound.scss';

const NoMatchesFound = ({ keyword }) => (
	<div className={classes.noMatchesFound}>
		Sorry, no matches found for
		<div className={classes.keyword}>{`"${keyword}"`}</div>
		<a href="/">Back home</a>
	</div>
);

const { string } = PropTypes;
NoMatchesFound.propTypes = {
	keyword: string.isRequired,
};

export default NoMatchesFound;
