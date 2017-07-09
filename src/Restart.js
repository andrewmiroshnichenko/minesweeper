import React from 'react';

const Restart = React.createClass({
	render: function() {
    let clockValue;
    if(this.props.clockValue === 0) {
      clockValue = 0;
    }
	  return (
	  	<div className="playground-header">
        <div className="minecount">{this.props.remainingMines}</div>
	  		<button className="restart-button" onClick={this.props.restart}>Restart</button>
        <div className="timeshow">
          <se-timer state={this.props.clockState} value={clockValue}></se-timer>
        </div>
	  	</div>
	  )
	}
});

export default Restart;