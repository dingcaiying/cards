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
			// alert('sorry, the min amount is 0. you cannot remove more.');
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

	static convertValueToText(value) {
		if (!value) return value;
		const text = ['0', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		return text[value];
	}

	render() {
		return (
			<div className="card">
				<div className="card-inner">
					<div className="content">
						<h4 className="card-name">
							{Card.convertValueToText(this.props.value)}
						</h4>
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