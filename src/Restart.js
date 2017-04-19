import React from 'react';

const Restart = React.createClass({
	render: function() {
	  return (
	  	<div className="playground-header">
	  		<button className="restart-button" onClick={this.props.restart}>Restart</button>
	  	</div>
	  )
	}
});

export default Restart;