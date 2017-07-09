import React from 'react';

const SetNumber = React.createClass({
  statics: {
    erroredFields: []
  },
  getInitialState: function() {
    return ({
      height: this.props.values.height,
      width: this.props.values.width,
      minesCount: this.props.values.minesCount
    })
  },
  changeWidth: function(e) {
    let value;
    if (+e.target.value < 41) {
      value = +e.target.value;
      let errorIndex = SetNumber.erroredFields.indexOf('width');
      SetNumber.erroredFields.splice(errorIndex, 1);
    } else {
      value = 40;
      SetNumber.erroredFields.push('width');
    }
    this.setState({
      width: value
    })
  },
  changeHeight: function(e) {
    let value;
    if (+e.target.value < 41) {
      value = +e.target.value;
      let errorIndex = SetNumber.erroredFields.indexOf('height');
      SetNumber.erroredFields.splice(errorIndex, 1);
    } else {
      value = 40;
      SetNumber.erroredFields.push('height');
    }
    this.setState({
      height: value
    })
  },
  changeNumber: function(e) {
    let value;
    if (+e.target.value < this.state.width * this.state.height) {
      value = +e.target.value;
      let errorIndex = SetNumber.erroredFields.indexOf('number');
      SetNumber.erroredFields.splice(errorIndex, 1);
    } else {
      value = this.state.width * this.state.height - 1;
      SetNumber.erroredFields.push('number');
    }
    this.setState({
      minesCount: value
    })
  },
  change: function(e) {
    this.props.setNewParams({width: this.state.width, height: this.state.height, minesCount: this.state.minesCount, paramsChanged: true});
  },
  render: function() {
    return (
      <div className="options">
        <h3 className="options__header">Set game options</h3>
        <p className="options__item">
          <label>
            Width
            <input type="text" className="options__input" value={this.state.width} onChange={this.changeWidth} />
          </label>
        </p>
        <p className={~SetNumber.erroredFields.indexOf('width') ? "options__error-message" : "none"}>Width can't exceed 40</p>
        <p className="options__item">
          <label>
            Height
            <input type="text" className="options__input" value={this.state.height} onChange={this.changeHeight} />
          </label>
        </p>
        <p className={~SetNumber.erroredFields.indexOf('height') ? "options__error-message" : "none"}>Height can't exceed 40</p>
        <p className="options__item">
          <label>
            Mines number
            <input type="text" className="options__input" value={this.state.minesCount} onChange={this.changeNumber} />
          </label>
        </p>
        <p className={~SetNumber.erroredFields.indexOf('number') ? "options__error-message" : "none"}>Number can't exceed width multiplying height</p>
        <button className="options__apply" onClick={this.change}>Apply options</button>
      </div>
    )
  }
});

export default SetNumber;