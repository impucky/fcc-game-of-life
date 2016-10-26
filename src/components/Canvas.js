import React from 'react';

class Canvas extends React.Component {
  constructor() {
    super();

    this.updateCanvas = this.updateCanvas.bind(this);

    this.state = {
      scaleMult: 12
    }
  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  updateCanvas(event) {
      const updatedGrid = this.props.grid;
      var rect = this.refs.canvas.getBoundingClientRect();
      var x = ~~(Math.round(event.clientX - rect.left) / this.state.scaleMult);
      var y = ~~(Math.round(event.clientY - rect.top) / this.state.scaleMult);
      (updatedGrid[x][y]) === 0 ? updatedGrid[x][y] = 1
      : updatedGrid[x][y] = 0;
      this.props.canvasClick(updatedGrid);
      this.renderCanvas();
    }

  renderCanvas() {
    var canvas = this.refs.canvas;
    var scaleMult = this.state.scaleMult;
    var gridWidth = this.props.gridWidth;
    var gridHeight = this.props.gridHeight;
    canvas.width = gridWidth * scaleMult;
    canvas.height = gridHeight * scaleMult;
    var ctx = canvas.getContext('2d');
    var scale = canvas.width / gridWidth;
    for (var x = 0; x < gridWidth; x++) {
      for (var y = 0; y < gridHeight; y++) {
        var tile = this.props.grid[x][y];
          if (tile === 0) ctx.fillStyle = '#111';
          else if (tile === 1) ctx.fillStyle = 'cornflowerblue';
          ctx.strokeStyle='#000';
          ctx.strokeRect(x * scale, y * scale, scale, scale);
          ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" onClick={(e) => this.updateCanvas(e)}></canvas>
      </div>
    );
  }
}

export default Canvas;
