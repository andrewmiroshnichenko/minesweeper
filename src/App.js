import React from 'react';
import Mine from './Mine';
import Restart from './Restart';
import SetParams from './SetParams';

const App = React.createClass({
	getInitialState: function() {
		return ({
			newGame: true,
			height: 10,
			width: 10,
			minesCount: 3,
			shouldOpen: []
		})
	},
	mines: [],
	siblingMinesCount:[],
	getMines: function(width, height, minesCount) {
	  let mines = [];
	  let currentHeight = height || this.state.height;
	  let currentWidth = width || this.state.width;
	  let currentMinesCount = minesCount || this.state.minesCount;
	  while (mines.length < currentMinesCount) {
	  	let index = Math.random() * currentHeight * currentWidth;
	  	index = Math.floor(index);
	  	if (!~mines.indexOf(index)) {
	  		mines.push(index);
	  	}
	  }
	  return mines;
	},
	getMinesSiblings: function(width, height) {
	  let mineSiblings = [];
	  let currentHeight = height || this.state.height;
	  let currentWidth = width || this.state.width;
	  console.log(this.mines, currentHeight, currentWidth);
	  for (let i = 0; i < this.mines.length; i++) {
	  	let localSiblings;
		  if (!((this.mines[i] - currentWidth + 1) % currentWidth)) {
		  	mineSiblings.push(this.mines[i] - currentWidth - 1, this.mines[i] - currentWidth, this.mines[i] - 1, this.mines[i] + currentWidth - 1, this.mines[i] + currentWidth);
		  } else if (!(this.mines[i] % currentWidth)) {
		  	mineSiblings.push(this.mines[i] - currentWidth, this.mines[i] - currentWidth + 1, this.mines[i] + 1, this.mines[i] + currentWidth, this.mines[i] + currentWidth + 1);
		  } else {
		  	mineSiblings.push(this.mines[i] - currentWidth - 1, this.mines[i] - currentWidth, this.mines[i] - currentWidth + 1, this.mines[i] - 1, 
		  	this.mines[i] + 1, this.mines[i] + currentWidth - 1, this.mines[i] + currentWidth, this.mines[i] + currentWidth + 1);
		  }
	  }
		let siblingMinesCount = {};
		for (let j = 0; j < mineSiblings.length; j++) {
			siblingMinesCount[mineSiblings[j]] = (siblingMinesCount[mineSiblings[j]] || 0) + 1;
		}
		return siblingMinesCount;
	},
	restartGame: function(params) {
		if (params.paramsChanged) {
			this.setState({
				width: params.width,
				height: params.height,
				newGame: true,
				minesCount: params.minesCount,
				shouldOpen: []
			});
		} else {
			this.setState({
				newGame: true,
				shouldOpen: []
			});
		}
	},
	gameStarted: function() {
		if (this.state.newGame) {
			this.setState({
				newGame: false
			});
		}
	},
	showSquares: function (params) {
		let initial = +params.index;
		let squaresToOpen = [];
		let newShouldOpen = [initial];
		let w = this.state.width;
		while (newShouldOpen.length) {
			let i = newShouldOpen[0];
			if (~this.mines.indexOf(i) || this.siblingMinesCount[i]) {
				newShouldOpen.splice(0, 1);
				squaresToOpen.push(i);
					continue;
			};
			let currentArr = [];
			if (!((i - w + 1) % w)) {
				currentArr.push(i - 1, i - w - 1, i + w - 1, i + w, i - w);
			} else if (!(i % w)) {
				currentArr.push(i + 1, i - w + 1, i + w + 1, i + w, i - w);
			} else {
				currentArr.push(i - 1, i + 1, i - w - 1, i + w - 1, i + w + 1, i - w + 1, i + w, i - w);
			}
			newShouldOpen = newShouldOpen.concat(currentArr.filter((item) => newShouldOpen.indexOf(item) < 0 && item >= 0 && squaresToOpen.indexOf(item) < 0 && item < this.state.height * this.state.width));
			squaresToOpen.push(i);
			newShouldOpen.splice(0, 1);
		}
		this.setState({
			shouldOpen: squaresToOpen
		});
	},
	componentWillMount: function() {
		this.mines = this.getMines();
		this.siblingMinesCount = this.getMinesSiblings();
	},
	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.newGame) {
			this.mines = this.getMines(nextState.width, nextState.height, nextState.minesCount);
			this.siblingMinesCount = this.getMinesSiblings(nextState.width, nextState.height);
		}
	},
	componentDidMount: function() {
		document.querySelector('.playground').style.width = this.state.width * 20 + 'px';
	},	
	componentDidUpdate: function() {
		document.querySelector('.playground').style.width = this.state.width * 20 + 'px';
	},
	render: function() {
  	let cells = [];
		for (var i = 0; i < this.state.width * this.state.height; i++) {
			let newline = !(i % this.state.width) ? 'newline' : '';
			// console.log(newline);
  		if (~this.mines.indexOf(i)) {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} class="mine square" newline={' ' + newline} key={i}></Mine>)
  		} else if (this.siblingMinesCount[i]) {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} content={this.siblingMinesCount[i]} class="square green" newline={' ' + newline} key={i}></Mine>)
  		} else {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} class="square" newline={' ' + newline} key={i}></Mine>)
  		}
		}

		return (
			<div className="playground">
				<SetParams setNewParams={this.restartGame} values={{width: this.state.width, height: this.state.height, minesCount: this.state.minesCount}} />
				<Restart restart={this.restartGame}/>
				<div className="playground__cells" onClick={this.gameStarted}>{cells}</div>
			</div>
		)
	}
});

export default App;