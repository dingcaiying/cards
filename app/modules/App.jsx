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
	}

	refresh() {
		this.forceUpdate();
	}

	gameStart() {
		const { handA, handB } = this.state;
		let result = Hand.compare(handA.getValues(), handB.getValues());
		this.setState({
			winner: result,
		});
	}

	render() {
		return (
			<div id="app">
				<div className="toolbox">
					<div className="btn" onClick={this.gameStart}>Start</div>
					{!!this.state.winner &&
						<div className="message">
							{this.state.winner === 1 && "A win!"}
							{this.state.winner === -1 && "B win!"}
							{this.state.winner === 0 && "Equal!"}
						</div>
					}
				</div>
				<div
					className="group groupA"
					onClick={this.refresh}
				>
					<h2>Card number {(this.state.handA).getValues().length}</h2>
					<h2>Card print {(this.state.handA).getValues().join(' ,')}</h2>
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
					<h2>Card number {(this.state.handB).getValues().length}</h2>
					<h2>Card print {(this.state.handB).getValues().join(' ,')}</h2>
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