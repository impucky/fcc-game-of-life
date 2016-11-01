import React from 'react';

class Controls extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSize: ["", " btn-active", ""],
      activeSpeed: ["", " btn-active", ""]
    };
  }

  pickGridSize(arr, index) {
    this.toggleActive("activeSize", index);
    const gridW = arr[0];
    const gridH = arr[1];
    this.props.updateGridSize(gridW, gridH);
  }

  updateSpeed(spd, index) {
    this.toggleActive("activeSpeed", index);
    const newSpeed = spd;
    this.props.updateSpeed(newSpeed);
  }

  toggleActive(element, index) {
    let updated = ["", "", ""];
    updated[index] = " btn-active";
    this.setState({
      [element]: updated
    });
  }

  render() {
    let playPause;
    if (this.props.gameIsRunning) {
      playPause = (
        <i className="material-icons btn btn-play-pause" onClick={() => this.props.stop()}>pause</i>
      )
    } else {
      playPause = (
        <i className="material-icons btn btn-play-pause" onClick={() => this.props.start()}>play_arrow</i>
      )
    }
    return (
      <div className="ui">
        <div className="ui-col">
          <h2>Grid size</h2>
          <div className="btn-group-3">
            <button className={"btn" + this.state.activeSize[0]} onClick={() => this.pickGridSize([80, 40], 0)}>Small</button>
            <button className={"btn" + this.state.activeSize[1]} onClick={() => this.pickGridSize([120, 60], 1)}>Medium</button>
            <button className={"btn" + this.state.activeSize[2]} onClick={() => this.pickGridSize([160, 80], 2)}>Large</button>
          </div>
          <h2>Speed</h2>
          <div className="btn-group-3">
            <button className={"btn" + this.state.activeSpeed[0]} onClick={() => this.updateSpeed(180, 0)}>Slow</button>
            <button className={"btn" + this.state.activeSpeed[1]} onClick={() => this.updateSpeed(90, 1)}>Medium</button>
            <button className={"btn" + this.state.activeSpeed[2]} onClick={() => this.updateSpeed(45, 2)}>Fast</button>
          </div>
        </div>
        <div className="ui-col">
          {playPause}
          <h2>Generation:</h2>
          <h2>{this.props.steps}</h2>
        </div>
        <div className="ui-col">
          <button className="btn btn-action" onClick={() => this.props.randomize()}>RANDOMIZE</button>
          <button className="btn btn-action" onClick={() => this.props.clear()}>CLEAR</button>
        </div>
      </div>
    );
  }
}

export default Controls;
