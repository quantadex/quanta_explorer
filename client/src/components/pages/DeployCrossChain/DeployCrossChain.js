import React, { Component } from 'react';
import classNames from 'classnames';
import { Button, Input } from 'reactstrap';

import config from '@quanta/config';
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

		const abi = '[ { "constant": true, "inputs": [], "name": "quantaAddress", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "destinationAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "trust", "type": "address" }, { "name": "quantaAddr", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "sender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "LogForwarded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "sender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "LogFlushed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "trust", "type": "address" }, { "indexed": false, "name": "quanta", "type": "string" } ], "name": "LogCreated", "type": "event" }, { "constant": false, "inputs": [ { "name": "tokenContractAddress", "type": "address" } ], "name": "flushTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "flush", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]';
		const code = "608060405234801561001057600080fd5b5060405161067338038061067383398101604052805160208083015160008054600160a060020a031916600160a060020a038516179055909201805191929091610060916001919084019061011b565b507fa49a9b1337d8427ee784aeaded38ac25b248da00282d53353ef0e2dfb664504a82826040518083600160a060020a0316600160a060020a0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156100d95781810151838201526020016100c1565b50505050905090810190601f1680156101065780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150506101b6565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061015c57805160ff1916838001178555610189565b82800160010185558215610189579182015b8281111561018957825182559160200191906001019061016e565b50610195929150610199565b5090565b6101b391905b80821115610195576000815560010161019f565b90565b6104ae806101c56000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633c8410a281146100e15780633ef133671461016b5780636b9f96ea1461019b578063ca325469146101b0575b60408051348152905133917f5bac0d4f99f71df67fa7cebba0369126a7cb2b183bcb02b8393dbf5185ba77b6919081900360200190a26000805460405173ffffffffffffffffffffffffffffffffffffffff909116913480156108fc02929091818181858888f193505050501580156100de573d6000803e3d6000fd5b50005b3480156100ed57600080fd5b506100f66101ee565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610130578181015183820152602001610118565b50505050905090810190601f16801561015d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017757600080fd5b5061019973ffffffffffffffffffffffffffffffffffffffff6004351661027b565b005b3480156101a757600080fd5b506101996103e4565b3480156101bc57600080fd5b506101c5610466565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102735780601f1061024857610100808354040283529160200191610273565b820191906000526020600020905b81548152906001019060200180831161025657829003601f168201915b505050505081565b604080517f70a082310000000000000000000000000000000000000000000000000000000081523060048201819052915183929160009173ffffffffffffffffffffffffffffffffffffffff8516916370a0823191602480830192602092919082900301818787803b1580156102f057600080fd5b505af1158015610304573d6000803e3d6000fd5b505050506040513d602081101561031a57600080fd5b5051905080151561032a576103de565b60008054604080517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff92831660048201526024810185905290519186169263a9059cbb926044808401936020939083900390910190829087803b1580156103a757600080fd5b505af11580156103bb573d6000803e3d6000fd5b505050506040513d60208110156103d157600080fd5b505115156103de57600080fd5b50505050565b6040805130318152905133917fa98efcd54f1f2ae5457ba3c68d7cf8974003a2bfce00f526f5624264a87bc0ea919081900360200190a26000805460405173ffffffffffffffffffffffffffffffffffffffff90911691303180156108fc02929091818181858888f19350505050158015610463573d6000803e3d6000fd5b50565b60005473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582061de18e7775520f21638941b7eec74f2ecdf7fc3d481b5a131c0ac336fecd5780029";

		var forwardContract = this.web3.eth.contract(JSON.parse(abi));
		var contractData = forwardContract.new.getData(
			config.getEnv().CROSSCHAIN_ADDRESS,
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
