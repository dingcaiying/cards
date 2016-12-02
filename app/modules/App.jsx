import React from 'react';
// import Card from './Card';
import Hand from './Hand';

// App interface
export default class App extends React.Component  {

	render() {
		return (
			<div id="app">
				<div className="group">
					<Hand values={[1, 2, 3, 4, 5]} />
				</div>
			</div>
		);
	}
}