import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import ToolsNavigation from '@quanta/components/common/ToolsNavigation';
import Caution from '@quanta/assets/images/caution.svg';
import templateClasses from '@quanta/styles/template.scss';
import classes from './GenerateKeys.scss';
import WalletApi from "@quanta/api/WalletApi";

class GenerateKeys extends Component {
	onGenerate = () => {
		const { generateKeys } = this.props;
		const keys = WalletApi.generate_key();
		const publicKey = keys.publicKey;
		const secretKey = keys.privateKey;
		generateKeys({ publicKey, secretKey });
	};
	render() {
		const { keys } = this.props;
		return (
			<div className={classNames(templateClasses.main, 'd-flex', classes.tools)}>
				<ToolsNavigation className="hidden-sm" network={this.props.match.params.network} />
				<div className={classes.content}>
					<h2>Generate Key</h2>
					<div className={classes.description}>Generate key pair for a new account</div>
					{keys && (
						<React.Fragment>
							<div className={classes.caution}>
								<img src={Caution} alt="caution" />
								ATTENTION: Please write down your secret key and keep it safe. It
								won't be displayed again. You will lose access to your tokens if you
								lose your secret key.
							</div>
							<div className={classNames(classes.title, 'font-weight-bold')}>
								PUBLIC KEY
							</div>
							<div className={classes.key}>{keys.publicKey}</div>
							<div className={classNames(classes.title, 'font-weight-bold')}>
								SECRET KEY
							</div>
							<div className={classes.key}>{keys.secretKey}</div>
						</React.Fragment>
					)}
					<Button color="primary" onClick={this.onGenerate}>
						Generate
					</Button>

					<hr />
					<p>
						If you're looking for 100% secure, offline wallet generation,
						check out our <a href="https://github.com/quantadex/offline_wallet" target="_blank">offline_wallet on Github</a>.
					</p>
				</div>
			</div>
		);
	}
}

const { func, shape, string } = PropTypes;

GenerateKeys.propTypes = {
	generateKeys: func.isRequired,
	keys: shape({
		secretKey: string.isRequired,
		publicKey: string.isRequired,
	}),
};

GenerateKeys.defaultProps = {
	keys: null,
};

export default GenerateKeys;
