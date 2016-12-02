import * as hc from '../constants/handCategories';

export default class Hand {
	constructor() {
		this.values = [];
		this.sortedValues = [];
		this.category = null;
		this.getValues = this.getValues.bind(this);
	}

	initialize(values) {
		this.setValues(values);
		this.values = [...this.decideBestCombination()];
		console.log(this.values);
	}

	pushValue(value) {
		console.log('push value', this.values);
		if (this.values.length < 5) {
			this.values.push(value);
			return true;
		} else {
			alert('already five cards in your hand.');
			return false;
		}
	}

	popValue(value) {
		console.log('pop value', this.values);
		this.values.splice(this.values.indexOf(value), 1);
		console.log('after pop value', this.values);
	}

	getValues() {
		return this.values;
	}

	getSortedValues() {
		return this.sortedValues;
	}

	getCategory() {
		return this.category;
	}

	/**
	 * @param Array
	 * @return Sorted array
	 */
	static sortCards(cardVlaues) {
		let copy = [...cardVlaues];
		let len = copy.length; // should always be 5
		let j;
		for (let p = 1; p < len; p++) {
			let tmp = copy[p];
			for (j = p; j > 0 && (tmp < copy[j-1]); j--) {
				copy[j] = copy[j-1]; 
			}
			copy[j] = tmp;
		}
		return copy;
	}

	/**
	 * @param Array
	 * @return According to array values, tell the category
	 */
	static tellCategory(sortedValues) {
		const values = [...sortedValues];
		let category = hc.HIGH_CARD;
		const recordObj = {
			count: {},
			breakpoint: [],
		};
		const len = values.length;
		for (let i = 1; i < len; i++) {
			let result = values[i] - values[i-1];
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
					category = hc.FOUR_A_KIND;
				} else {
					category = hc.FULL_HOUSE;
				}
				break;
			case 2:
				if (recordObj.breakpoint.length === 1 && recordObj.breakpoint[0] === 2 || recordObj.breakpoint[0] === 3) {
					category = hc.THREE_A_KIND;
				} else {
					category = hc.TWO_PAIR;
				}
				break;
			case 1:
				category = hc.ONE_PAIR;
				break;
			default:
				category = hc.HIGH_CARD;
				break;
		}
		if (recordObj.count[1] === 4) {
			category = hc.STRAIGHT;
		}
		return category;
	}

	/**
	 * @param  Hand values
	 * @param  Hand values
	 * @return hand1 > hand2. 1, 0, -1
	 */
	static compare(hand1, hand2) {
		const sortedHand1 = Hand.sortCards(hand1);
		const sortedHand2 = Hand.sortCards(hand2);
		const hand1Category = Hand.tellCategory(sortedHand1);
		const hand2Category = Hand.tellCategory(sortedHand2);
		let result = hand1Category - hand2Category;
		if (result === 0) {
			const len = hand1Category.length;
			for (let i = 0; i < len; i++) {
				result = sortedHand1[i] - sortedHand2[i];
				if (result !== 0) {
					break;
				}
			}
		}
		return result === 0 ? result : result / Math.abs(result);
	}

	/**
	 * Desctiption: Consider 'A' as two separate values: [1, 14].
	 * So there will be two possible combination. Find the higher rank one
	 * as its values (and category...)
	 * @return Array Beat combination (may sorted or not)
	 */
	decideBestCombination() {
		let tmpValues = [...this.values];
		if (tmpValues.length <= 0) {
			console.log('empty hand values');
			return;
		}
		if (!tmpValues.includes(1)) {
			return [...tmpValues];
		}
		const hand1 = [...tmpValues];
		const hand2 = tmpValues.map((v) => {
			if (v === 1) return 14;
			else return v;
		});
		const result = Hand.compare(hand1, hand2);
		return result > 0 ? hand1 : hand2;
	}

}
