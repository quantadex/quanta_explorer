import React, { Component } from 'react';

const asyncComponent = importComponent => {
	return class extends Component {
		state = {
			RenderComponent: null,
		};

		componentDidMount() {
			importComponent().then(cmp => {
				this.setState({ RenderComponent: cmp.default });
			});
		}

		render() {
			const { RenderComponent } = this.state;
			return RenderComponent ? <RenderComponent {...this.props} /> : null;
		}
	};
};

export default asyncComponent;
