import React from 'react';

const Mine = React.createClass({
	getInitialState: function() {
		let newline = this.props.newline ? ' newline' : '';
		return ({
			style: 'square hidden' + newline,
			content: '',
			restart: this.props.restart
		})
	},
	showSquare: function(e) {
		let newline = this.props.newline ? ' newline' : '';
		if (e) {
			this.initiatator = true;
		}
		if ((this.props.class !== 'mine square') && !this.props.content) {
			this.props.showSquares({index: this.props.index, userGenerated: e.target});
		}
		if (this.props.content && e.style !== 'square hidden' + newline) {
			this.props.showSquares({index: this.props.index, clearIndex: true});
		}
		this.setState({
			style: this.props.class + newline,
			content: this.props.content
		});
	},
	componentWillReceiveProps: function(nextProps, nextState) {
		let newline = this.props.newline ? ' newline' : '';
		if (nextProps.restart) {
			this.setState({
				style: 'square hidden' + newline,
				content: ''
			});
		}
		if (nextProps.shouldOpen && this.state.style !== this.props.class + newline) {
			for (let i = 0; i < nextProps.shouldOpen.length; i++) {
				if (nextProps.shouldOpen[i] === this.props.index) this.showSquare(nextState);
			}
		}
	},
	initiatator: false,
	shouldComponentUpdate: function(nextProps, nextState) {
		let newline = this.props.newline ? ' newline' : '';
		// console.log(nextState.style, this.props.class + newline, this.state.style, this.props.index);
		// console.log(nextProps.shouldOpen.length);
		// console.log(1);
		if (!this.initiatator && nextProps.shouldOpen.length && !~nextProps.shouldOpen.indexOf(this.props.index)) {
			return false;	
		} else if (nextState.style === this.props.class + newline && nextState.style !== this.state.style) {
		// console.log(2);
			return true;
		} else {
			// console.log(1);
			return false;
		}
	},
	render: function() {
		// console.log(1);
	  return <div className={this.state.style} onClick={this.showSquare}>{this.state.content}</div>;
	}
});

export default Mine;