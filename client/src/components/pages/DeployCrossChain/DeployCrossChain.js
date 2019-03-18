import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';

import CONFIG from '@quanta/config';
import ToolsNavigation from '@quanta/components/common/ToolsNavigation';
import templateClasses from '@quanta/styles/template.scss';
import classes from './DeployCrossChain.scss';

import Caution from '@quanta/assets/images/caution.svg';

class DeployCrossChain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantaAddress: '',
			isError: true,
			ethereumAddress: '',
		};
	}

	componentDidMount() {
		this.web3 = window.web3;
		if (typeof this.web3 === 'undefined') {
			return;
		}

		setInterval(() => {
			this.web3.eth.getAccounts((err, accounts) => {
				if (accounts[0]) {
					this.setState({
						ethereumAddress: accounts[0],
						isError: false,
					});
				} else {
					this.setState({
						ethereumAddress: '',
						isError: true,
					});
				}
			});
		}, 100);
	}
	onDeployCrossChain = () => {
		const { quantaAddress } = this.state;
		if (!this.web3) {
			return;
		}

		const abi =
			'[{"constant":true,"inputs":[],"name":"quantaAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"flush","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"destinationAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"trust","type":"address"},{"name":"quantaAddr","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogForwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogFlushed","type":"event"}]';
		const code =
			'608060405234801561001057600080fd5b5060405161041e38038061041e83398101604052805160208083015160008054600160a060020a031916600160a060020a0385161790559092018051919290916100609160019190840190610068565b505050610103565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a957805160ff19168380011785556100d6565b828001600101855582156100d6579182015b828111156100d65782518255916020019190600101906100bb565b506100e29291506100e6565b5090565b61010091905b808211156100e257600081556001016100ec565b90565b61030c806101126000396000f3006080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c8410a281146100d65780636b9f96ea14610160578063ca32546914610177575b60408051348152905133917f5bac0d4f99f71df67fa7cebba0369126a7cb2b183bcb02b8393dbf5185ba77b6919081900360200190a26000805460405173ffffffffffffffffffffffffffffffffffffffff909116913480156108fc02929091818181858888f193505050501580156100d3573d6000803e3d6000fd5b50005b3480156100e257600080fd5b506100eb6101b5565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561012557818101518382015260200161010d565b50505050905090810190601f1680156101525780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561016c57600080fd5b50610175610242565b005b34801561018357600080fd5b5061018c6102c4565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561023a5780601f1061020f5761010080835404028352916020019161023a565b820191906000526020600020905b81548152906001019060200180831161021d57829003601f168201915b505050505081565b6040805130318152905133917fa98efcd54f1f2ae5457ba3c68d7cf8974003a2bfce00f526f5624264a87bc0ea919081900360200190a26000805460405173ffffffffffffffffffffffffffffffffffffffff90911691303180156108fc02929091818181858888f193505050501580156102c1573d6000803e3d6000fd5b50565b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582043822668310b3d2e90aa63e4d6df1b84d5beb5b293b898420b19f04f9269d9770029';

		var forwardContract = this.web3.eth.contract(JSON.parse(abi));
		var contractData = forwardContract.new.getData(
			CONFIG.SETTINGS.CROSSCHAIN_ADDRESS,
			quantaAddress,
			{ data: code }
		);

		this.web3.eth.sendTransaction({ data: contractData }, function (err, transactionHash) {
			if (!err) console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
		});
	};

	onChangeQuantaAddress = event => {
		const { value } = event.target;

		this.setState({
			quantaAddress: value,
		});
	};

	render() {
		const { quantaAddress, isError, ethereumAddress } = this.state;
		return (
			<div className={classNames(templateClasses.main, 'd-flex', classes.tools)}>
				<ToolsNavigation className="hidden-sm" network={this.props.match.params.network} />
				<div className={classes.content}>
					<h2>Deploy Crosschain Ethereum</h2>
					<div className={classes.description}>
						This will create a smart contract with the address where you can deposit
						into your QUANTA account.
					</div>
					<div className={classes.quantaAddress}>QUANTA Address</div>
					<Input
						className={classes.quantaAddressInput}
						type="text"
						value={quantaAddress}
						onChange={this.onChangeQuantaAddress}
						placeholder="Example:  QBS4…. 6S3K"
					/>
					<div className={classes.actionArea}>
						<Button
							color="primary"
							onClick={this.onDeployCrossChain}
							disabled={isError}
						>
							Deploy Contract
						</Button>
						{isError && (
							<div className={classes.caution}>
								<img src={Caution} alt="caution" />
								Please login on Metamask to deploy Contract
							</div>
						)}
					</div>
					{!isError && (
						<div className={classes.ethereumAddress}>
							Ethereum address: {ethereumAddress}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default DeployCrossChain;
