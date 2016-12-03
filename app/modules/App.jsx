import React from 'react';
import Card from './Card';
import Hand from './Hand';

// <Hand values={[10, 10, 10,  13, 15]} />
// App interface
export default class App extends React.Component  {

	constructor(props) {
		super(props);
		this.state = {
			handA: new Hand(),
			handB: new Hand(),
			winner: null, // number
		};
		this.refresh = this.refresh.bind(this);
		this.gameStart = this.gameStart.bind(this);
		this.clearCards = this.clearCards.bind(this);
	}

	refresh() {
		this.forceUpdate();
	}

	gameStart() {
		const { handA, handB } = this.state;
		const handAValues = handA.getValues();
		const handBValues = handB.getValues();
		if (handAValues.length < 5) {
			alert('Not enough cards for A.');
			return;
		}
		if (handBValues.length < 5) {
			alert('Not enough cards for B.');
			return;
		}
		let result = Hand.compare(handA, handB);
		this.setState({
			winner: result,
		});
	}

	clearCards() {
		const { handA, handB } = this.state;
		handA.clear();
		handB.clear();
		this.forceUpdate();
	}

	render() {
		return (
			<div id="app">
				<div className="toolbox">
					<div className="btn" onClick={this.clearCards}>Clear</div>
					<div className="btn" onClick={this.gameStart}>Start</div>
					<div className="message">
						{this.state.winner === 1 && "A win!"}
						{this.state.winner === -1 && "B win!"}
						{this.state.winner === 0 && "Equal!"}
					</div>
				</div>
				<div
					className="group groupA"
					onClick={this.refresh}
				>
					<h3>A:</h3>
					<h3>Card number {(this.state.handA).getValues().length}</h3>
					<h3>Card print {(this.state.handA).getValues().map((v) => v <= 13 ? v : v - 13).join(' ,')}</h3>
					{[...new Array(13)].map((v, i) =>
						<Card
							key={i}
							value={i+1}
							refHand={this.state.handA}
						/>
					)}					
				</div>
				<div
					className="group groupB"
					onClick={this.refresh}
				>
					<h3>B:</h3>
					<h3>Card number {(this.state.handB).getValues().length}</h3>
					<h3>Card print {(this.state.handB).getValues().map((v) => v <= 13 ? v : v - 13).join(' ,')}</h3>
					{[...new Array(13)].map((v, i) =>
						<Card
							key={i}
							value={i+1}
							refHand={this.state.handB}
						/>
					)}					
				</div>

			</div>
		);
	}
}