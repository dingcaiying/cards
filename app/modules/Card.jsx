import React from 'react';

export default class Card extends React.Component  {

	static convertValueToText(value) {
		if (!value) return value;
		const text = ['0', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		return text[value];
	}

	render() {
		const { value, clickHandler } = this.props;
		return (
			<div
				className="card"
				onClick={(e) => clickHandler(e, value)}>
				<h4 className="card-name">
					{Card.convertValueToText(this.props.value)}
				</h4>
			</div>
		);
	}
}
