import React from 'react';

const Mine = React.createClass({
	getInitialState: function() {
		return ({
			style: 'square hidden' + this.props.newline,
			content: '',
		})
	},
	showSquare: function(e) {
		if (e.ctrlKey  && !this.state.blocked) {
			this.setState({
				content: '!',
				blocked: true
			});
		} else if (e.ctrlKey  && this.state.blocked) {
			this.setState({
				content: '',
				blocked: false
			});
		} else if (!this.state.blocked) {
			if (e.target) {
				this.props.showSquares({index: this.props.index});
			}
			this.setState({
				style: this.props.class + this.props.newline,
				content: this.props.content
			});
		}
	},
	componentWillReceiveProps: function(nextProps, nextState) {
		if (nextProps.restart) {
			this.setState({
				style: 'square hidden' + nextProps.newline,
				content: '',
				blocked: false
			});
		}
		if (nextProps.shouldOpen.length && this.state.style !== this.props.class + this.props.newline) {
			for (let i = 0; i < nextProps.shouldOpen.length; i++) {
				if (nextProps.shouldOpen[i] === this.props.index) {
					this.setState({
						style: this.props.class + this.props.newline,
						content: this.props.content
					});
				};
			}
		}
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		for (let i = 0; i < nextProps.shouldOpen.length; i++) {
			if (nextProps.shouldOpen[i] === this.props.index) return true;
		}
		if (nextProps.restart) {
			return true;
		}
		if (nextProps.style !== this.props.style) {
			return true;
		}
		if (nextState.content !== this.state.content) {
			return true;
		}
		return false;
	},
	render: function() {
		if (this.state.content === '!') {
			console.log('!!!');
		}
	  return <div className={this.state.style} onClick={this.showSquare}>{this.state.content}</div>;
	}
});

export default Mine;