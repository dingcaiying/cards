const cardSet = 4;

export default class Warehouse {

	constructor() {
		this.stock = [];
		this.initiateStock();
	}

	initiateStock() {
		[...new Array(13)].map((v, i) => {
			const arr = Array(cardSet).fill(i+1);
			this.stock.push(...arr);
		});
		return this;
	}

	dealCard(value) {
		const index = this.stock.indexOf(value);
		if (index > -1) {
			this.stock.splice(index, 1);
			return true;
		}
		return false;
	}

	recycleCard(value) {
		const remain = this.stock.filter((v) => v === value);
		if (remain.length < cardSet) {
			this.stock.push(value);
		}
	}
}
