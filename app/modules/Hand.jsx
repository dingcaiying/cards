import React from 'react';
import Card from './Card'; 
import * as hc from '../constants/handCategories';

export default class Hand extends React.Component  {
	constructor(props) {
		super(props);
		this.values = props.values || [];
		this.sortedValues = [];
		this.category = null;
	}

	componentDidMount() {
		this.getSorted();
		this.getCategory();
	}

	getSorted() {
		let copy = [...this.values];
		let len = copy.length; // should always be 5
		let j;
		for (let p = 1; p < len; p++) {
			let tmp = copy[p];
			for (j = p; j > 0 && (tmp < copy[j-1]); j--) {
				copy[j] = copy[j-1]; 
			}
			copy[j] = tmp;
		}
		this.sortedValues = [...copy];
	}

	getCategory() {
		// assue values.length === 5.
		const sortedValues = this.sortedValues;
		const recordObj = {
			count: {},
			breakpoint: [],
		};
		const len = sortedValues.length;
		for (let i = 1; i < len; i++) {
			let result = sortedValues[i] - sortedValues[i-1];
			if (!recordObj.count[result]) {
				recordObj.count[result] = 0;
			}
			recordObj.count[result]++;
			if (result !== 0) {
				recordObj.breakpoint.push(i);
			}
		}
		// according to how many '0' & '1' in the diffs, get the category
		switch (recordObj.count[0]) {
			case 3:
				if (5 % recordObj.breakpoint[0] < 2) {
					this.category = hc.FOUR_A_KIND;
				} else {
					this.category = hc.FULL_HOUSE;
				}
				break;
			case 2:
				if (recordObj.breakpoint.length === 1 && recordObj.breakpoint[0] === 2 || recordObj.breakpoint[0] === 3) {
					this.category = hc.THREE_A_KIND;
				} else {
					this.category = hc.TWO_PAIR;
				}
				break;
			case 1:
				this.category = hc.ONE_PAIR;
				break;
			default:
				this.category = hc.HIGH_CARD;
				break;
		}
		if (recordObj.count[1] === 4) {
			this.category = hc.STRAIGHT;
		}
		console.log(this.category);
	}

	render() {
		return (
			<div>
				<h1>Hand</h1>
				{this.values.map((value, i) =>
					<Card key={i} value={value} />
				)}
			</div>
		);
	}
}
