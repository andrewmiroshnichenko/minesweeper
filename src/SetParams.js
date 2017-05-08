import React from 'react';

const SetNumber = React.createClass({
	getInitialState: function() {
		return ({
			height: this.props.values.height,
			width: this.props.values.width,
			minesCount: this.props.values.minesCount,
		})
	},
	changeWidth: function(e) {
		this.setState({
			width: +e.target.value
		})
	},
	changeHeight: function(e) {
		this.setState({
			height: +e.target.value
		})
	},
	changeNumber: function(e) {
		this.setState({
			minesCount: +e.target.value
		})
	},
	change: function(e) {
		this.props.setNewParams({width: this.state.width, height: this.state.height, minesCount: this.state.minesCount, paramsChanged: true});
	},
	componentDidMount: function() {
		document.querySelectorAll('.options__input')[0].value = this.props.values.width;
		document.querySelectorAll('.options__input')[1].value = this.props.values.height;
		document.querySelectorAll('.options__input')[2].value = this.props.values.minesCount;
	},
 	render: function() {
	  return (
	  	<div className="options">
	  		<h3 className="options__header">Set game options</h3>
	  		<p className="options__item">
		  		<label>
						Width
		  			<input type="text" className="options__input" onChange={this.changeWidth} />
		  		</label>
	  		</p>
	  		<p className="options__item">
		  		<label>
						Height
		  			<input type="text" className="options__input" onChange={this.changeHeight} />
		  		</label>
	  		</p>
	  		<p className="options__item">
		  		<label>
						Mines number
		  			<input type="text" className="options__input" onChange={this.changeNumber} />
		  		</label>
	  		</p>
	  		<button className="options__apply" onClick={this.change}>Apply options</button>
	  	</div>
	  )
	}
});

export default SetNumber;