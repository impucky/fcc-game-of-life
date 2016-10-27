import React from 'react';

class Controls extends React.Component {
  constructor() {
    super();
  }

  pickGridSize() {
    const gridW = this.refs.gridW.value;
    const gridH = this.refs.gridH.value;
    this.props.updateGridSize(gridW, gridH);
  }

  updateSpeed() {

  }

  render() {
    return (
      <div className="ui">
        <div className="ui-left">
          <h3>Grid size:</h3>
          <input ref="gridW" defaultValue={this.props.gridWidth}></input>
          <span> X </span>
          <input ref="gridH" defaultValue={this.props.gridHeight}></input>
          <span> Cells</span>
          <button onClick={(e) => this.pickGridSize(e)}>Refresh</button>
          <p>Speed: </p>
          <select>
            <option>40</option>
            <option>80</option>
            <option>120</option>
          </select>
        </div>
        <div className="ui-center">
          <button onClick={() => this.props.start()}>START</button>
          <button onClick={() => this.props.stop()}>STOP</button>
          <h3>Generation: {this.props.steps}</h3>
        </div>
        <div className="ui-right">
          <button onClick={() => this.props.randomize()}>RANDOMIZE</button>
          <button onClick={() => this.props.clear()}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default Controls;
