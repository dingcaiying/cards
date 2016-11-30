import React from 'react';

export default class Card extends React.Component  {
	constructor(props) {
		super(props);
		this.value = props.value || -1;
	}

	getValue() {
		return this.value;
	}

	setValue(value) {
		this.value = value;
	}

	render() {
		return (
			<div className="card">
				<h2>card</h2>
				<h4>{this.value}</h4>
			</div>
		);
	}
}