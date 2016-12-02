import React from 'react';

export default class Card extends React.Component  {

	static propTypes = {
		value: React.PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			count: 0,
		};
		this.onClickRemove = this.onClickRemove.bind(this);
		this.onClickAdd = this.onClickAdd.bind(this);
	}

	getValue() {
		return this.props.value;
	}

	onClickRemove() {
		let oldCount = this.state.count;
		if (oldCount <= 0) {
			alert('sorry, the min amount is 0. you cannot remove more.');
			return;
		}
		this.setState({
			count: --oldCount,
		});
		this.props.refHand.popValue(this.props.value);
	}

	onClickAdd() {
		let oldCount = this.state.count;
		if (oldCount >= 4) {
			alert('sorry, the max amount is 4. you cannot add more.');
			return;
		}
		const passed = this.props.refHand.pushValue(this.props.value);
		if (passed) {
			this.setState({
				count: ++oldCount,
			});
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-inner">
					<div className="content">
						<h2>card</h2>
						<h4>{`value: ${this.props.value}`}</h4>
						<h4>{`count: ${this.state.count}`}</h4>
					</div>
				</div>
				<div
					className="card-left-remove"
					onClick={this.onClickRemove}
				>-</div>
				<div
					className="card-right-add"
					onClick={this.onClickAdd}
				>+</div>
			</div>
		);
	}
}