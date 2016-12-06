import React from 'react';
import Card from './Card';
import Hand from './Hand';
import Warehouse from './Warehouse';


const total = 2;

export default class App extends React.Component  {

	constructor(props) {
		super(props);
		this.state = {
			warehouse: new Warehouse(),
			hands: [],
			openPopup: false,
			currentCard: null,
			rank: [],
		};
		for (let i = 0; i < total; i++) {
			this.state.hands.push(new Hand());
		}
		this.reset = this.reset.bind(this);
		this.gameStart = this.gameStart.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}

	reset() {
		const { warehouse, hands } = this.state;
		warehouse.reset();
		hands.map((h) => h.clear());
		this.setState({
			rank: [],
		});
	}

	onClickCard(e, value) {
		this.setState({
			currentCard: value,
			openPopup: true,
		});
	}

	addToHand(i) {
		const { warehouse, hands, currentCard } = this.state;
		let handAllowed = hands[i].getValues().length < 5;
		let whAllowed = false;
		if (handAllowed) {
			whAllowed = warehouse.dealCard(currentCard);
		} else {
			alert('already five cards in your hand.');
		}
		if (whAllowed) {
			hands[i].pushValue(currentCard);
		}
		this.setState({
			openPopup: false,
		});
	}

	gameStart() {
		const { hands } = this.state;
		let valid = true;
		const len = hands.length;
		for (let i = 0; i < len; i++) {
			if (hands[i].getValues().length < 5) {
				alert(`hand - ${i} doesn't have enough card.`);
				valid = false;
				break;
			}
		}
		if (!valid) return false;
		const copyHands = [...hands];
		copyHands.sort(Hand.compare);
		this.setState({
			rank: [...copyHands.reverse()],
		});
	}

	closePopup() {
		this.setState({
			openPopup: false,
		});
	}

	render() {
		return (
			<div id="app">
				<div className="toolbox">
					<div className="btn" onClick={this.reset}>Clear</div>
					<div className="btn" onClick={this.gameStart}>Start</div>
				</div>
				<div className="group">
					{[...new Array(13)].map((v, i) =>
						<Card
							key={i}
							value={i+1}
							clickHandler={(e, v) => this.onClickCard(e, v)}
						/>
					)}
				</div>
				<div className="hand-group">
					<h2>Hands</h2>
					<ul>
						{this.state.hands.map((hand, i) =>
							<li key={i}>
								<h3>{`Hand - ${i}: `}
									{hand.getValues().map((v) => Card.convertValueToText(v)).join(' ,')}
								</h3>
							</li>
						)}
					</ul>
				</div>
				<div className="rank">
					<h2>Rank</h2>
					<ul>
						{this.state.rank.map((r, i) =>
							<li key={i}>
								<h3>
									{r.getValues().map((v) => Card.convertValueToText(v)).join(' ,')}
								</h3>
							</li>
						)}
					</ul>
				</div>
				<div
					className={this.state.openPopup ? "popup active" : 'popup'}
					id="popup-choice"
					>
					<span
						className="close"
						onClick={this.closePopup}
					>close</span>
					<div className="popup-head">
						<h3>To whom?</h3>
					</div>
					<div className="popup-body">
						<ul>
							{[...new Array(total)].map((v, i) =>
								<li key={i}>
									<h4 onClick={() => this.addToHand(i)}>Hand - {i}</h4>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}