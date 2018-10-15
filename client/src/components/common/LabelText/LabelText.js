import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import classes from './LabelText.scss';

const LabelText = ({ label, text, isLong }) => (
	<div>
		<div className={classes.label}>{label}</div>
		<div
			className={className(classes.text, {
				[classes.isLong]: isLong,
			})}
		>
			{text}
		</div>
	</div>
);

const { string, bool, number } = PropTypes;

LabelText.propTypes = {
	label: string,
	text: string | number,
	isLong: bool,
};

LabelText.defaultProps = {
	label: '',
	text: '',
	isLong: false,
};

export default LabelText;
