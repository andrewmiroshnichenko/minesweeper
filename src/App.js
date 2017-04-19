import React from 'react';
import Mine from './Mine';
import Restart from './Restart';

const App = React.createClass({
	getInitialState: function() {
		return ({
			newGame: true,
			height: 3,
			width: 3,
			minesCount: 1,
			shouldOpen: []
		})
	},
	getMines: function() {
	  let mines = [];
	  while (mines.length < this.state.minesCount) {
	  	let index = Math.random() * this.state.height * this.state.width;
	  	index = Math.floor(index);
	  	if (!~mines.indexOf(index)) {
	  		mines.push(index);
	  	}
	  }
	  return mines;
	},
	getMinesSiblings: function() {
	  let mineSiblings = [];
	  for (let i = 0; i < this.mines.length; i++) {
	  	let localSiblings;
		  if (!((this.mines[i] - this.state.width + 1) % this.state.width)) {
		  	mineSiblings.push(this.mines[i] - this.state.width - 1, this.mines[i] - this.state.width, this.mines[i] - 1, this.mines[i] + this.state.width - 1, this.mines[i] + this.state.width);
		  } else if (!(this.mines[i] % this.state.width)) {
		  	mineSiblings.push(this.mines[i] - this.state.width, this.mines[i] - this.state.width + 1, this.mines[i] + 1, this.mines[i] + this.state.width, this.mines[i] + this.state.width + 1);
		  } else {
		  	mineSiblings.push(this.mines[i] - this.state.width - 1, this.mines[i] - this.state.width, this.mines[i] - this.state.width + 1, this.mines[i] - 1, 
		  	this.mines[i] + 1, this.mines[i] + this.state.width - 1, this.mines[i] + this.state.width, this.mines[i] + this.state.width + 1);
		  }
	  }
		let siblingMinesCount = {};
		for (let j = 0; j < mineSiblings.length; j++) {
			siblingMinesCount[mineSiblings[j]] = (siblingMinesCount[mineSiblings[j]] || 0) + 1;
		}
		return siblingMinesCount;
	},
	newGame: function() {
		this.setState({
			newGame: true
		});
	},
	gameStarted: function() {
		if (this.state.newGame) {
			this.setState({
				newGame: false
			});
		}
	},
	shouldOpen: [],
	shouldntOpen: [],
	showSquares: function (params) {
		let i = +params.index;
		if (params.clearIndex) {
			this.shouldOpen.splice(this.shouldOpen.indexOf(i), 1);
			this.shouldntOpen.push(i);
			return;
		}
		if (params.userGenerated) this.shouldOpen = [];
		let newShouldOpen = this.shouldOpen;
		let w = this.state.width;
		let currentArr = [];
		if (!((i - w + 1) % w)) {
			currentArr.push(i - 1, i - w - 1, i + w - 1, i + w, i - w);
		} else if (!(i % w)) {
			currentArr.push(i + 1, i - w + 1, i + w + 1, i + w, i - w);
		} else {
			currentArr.push(i - 1, i + 1, i - w - 1, i + w - 1, i + w + 1, i - w + 1, i + w, i - w);
		}
		this.shouldOpen = newShouldOpen.concat(currentArr.filter((item) => newShouldOpen.indexOf(item) < 0 && item >= 0 && this.shouldntOpen.indexOf(item) < 0 && item < this.state.height * this.state.width));
		if (!params.userGenerated) {
			this.shouldOpen.splice(this.shouldOpen.indexOf(i), 1);
			this.shouldntOpen.push(i);
		}
		// console.log(this.shouldntOpen.length, this.shouldOpen.length);
		this.setState({
			shouldOpen: this.shouldOpen
		});
	},
	componentWillMount: function() {
		this.mines = this.getMines();
		this.siblingMinesCount = this.getMinesSiblings();
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextState.shouldOpen);
		return true;
	},
	render: function() {
  	let cells = [];
		for (var i = 0; i < this.state.width * this.state.height; i++) {
  		if (~this.mines.indexOf(i)) {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} class="mine square" newline={!(i % this.state.width)} key={i}></Mine>)
  		} else if (this.siblingMinesCount[i]) {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} content={this.siblingMinesCount[i]} class="square green" newline={!(i % this.state.width)} key={i}></Mine>)
  		} else {
  			cells.push(<Mine shouldOpen={this.state.shouldOpen} index={i} showSquares={this.showSquares} restart={this.state.newGame} class="square" newline={!(i % this.state.width)} key={i}></Mine>)
  		}
		}
		return (
			<div>
				<Restart restart={this.newGame}/>
				<div className="playground" onClick={this.gameStarted}>{cells}</div>
			</div>
		)
	}
});

export default App;