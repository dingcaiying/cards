import React from 'react';
import Card from './Card';
// import Hand from './Hand';

// <Hand values={[10, 10, 10,  13, 15]} />
// App interface
export default class App extends React.Component  {

	render() {
		return (
			<div id="app">
				<div className="group">
					{[...new Array(13)].map((v, i) =>
						<Card key={i} value={i+1} />
					)}					
				</div>
			</div>
		);
	}
}