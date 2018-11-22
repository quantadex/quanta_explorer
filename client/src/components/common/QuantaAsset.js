import React, { Component } from 'react';
import QuantaAddress from '@quanta/components/common/QuantaAddress';
import { trimAccountId } from '@quanta/helpers/string';

class QuantaAsset extends Component {
	render() {
		return (
			<div>
				{this.props.code}*{trimAccountId(this.props.issuer)}
			</div>
		);
	}
}

export default QuantaAsset;