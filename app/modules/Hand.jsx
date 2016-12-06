import * as hc from '../constants/handCategories';

export default class Hand {
	constructor(name) {
		this.name = name;
		this.values = [];
		this.category = null;
		this.getValues = this.getValues.bind(this);
		this.decideBestCombination = this.decideBestCombination.bind(this);
	}

	getName() {
		return this.name;
	}

	getValues() {
		return this.values;
	}

	getCategory() {
		return this.category;
	}

	pushValue(value) {
		if (this.values.length < 5) {
			this.values.push(value);
			return true;
		} else {
			alert('already five cards in your hand.');
			return false;
		}
	}

	popValue(value) {
		this.values.splice(this.values.indexOf(value), 1);
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
			return this;
		}
		if (!tmpValues.includes(1)) {
			return this;
		}
		const valuesA = [...tmpValues];
		const valuesB = tmpValues.map((v) => {
			if (v === 1) return 14;
			else return v;
		});
		const result = Hand.compare(valuesA, valuesB);
		this.values = result > 0 ? valuesA : valuesB;
		return this;
	}

	clear() {
		this.values = [];
		this.category = null;
	}

	/**
	 * @param Array
	 * @return Sorted array
	 */
	static sortCards(cardVlaues) {
		const copy = [...cardVlaues];
		copy.sort((a, b) => b -a);
		// sort: put category feature cards to the top.
		const categories = {
		  1: [],
		  2: [],
		  3: [],
		  4: [],
		};
		const len = copy.length;
		for (let i = 0; i < len;) {
		  let j = i;
		  let count = 1;
		  while (++j < len && copy[j - 1] === copy[j]) {
		    count ++;
		  }
		  categories[count].push(i);
		  i = j;
		}
		let result = [];
		let tmpCopy = [];
		let cur = [];
		Object.keys(categories).map((key) => {
		  categories[key].reverse().map((idx) => {
				tmpCopy = [...copy];
		    cur = tmpCopy.splice(idx, key);
		    result.splice(0, 0, ...cur);
		  });
		});
		return [...copy];
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
		for (let i = 0; i < len - 1; i++) {
			let result = values[i] - values[i+1];
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
				if (recordObj.breakpoint[0] === 1 || recordObj.breakpoint[0] === 4) {
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
	 * @param  Hand values / Hand
	 * @param  Hand values / Hand
	 * @return hand1 > hand2. 1, 0, -1
	 */
	static compare(handA, handB) {
		let valuesA, valuesB;
		if (Array.isArray(handA)) {
			valuesA = handA;
			valuesB = handB;
		} else {
			valuesA = handA.decideBestCombination().getValues();
			valuesB = handB.decideBestCombination().getValues();
		}
		const sortedValuesA = Hand.sortCards(valuesA);
		const sortedValuesB = Hand.sortCards(valuesB);
		const categoryA = Hand.tellCategory(sortedValuesA);
		const categoryB = Hand.tellCategory(sortedValuesB);
		let result = categoryA - categoryB;
		if (result === 0) {
			const len = sortedValuesA.length;
			for (let i = 0; i < len; i++) {
				result = sortedValuesA[i] - sortedValuesB[i];
				if (result !== 0) {
					break;
				}
			}
		}
		return result === 0 ? result : result / Math.abs(result);
	}

}
