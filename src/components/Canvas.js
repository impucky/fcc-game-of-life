import React from 'react';

class Canvas extends React.Component {
  constructor() {
    super();

    this.handleCanvasClick = this.handleCanvasClick.bind(this);

  }

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  // Convert click pos to array coords, update grid and pass to parent component via updateCanvas()
  handleCanvasClick(event) {
      const updatedGrid = this.props.grid;
      const rect = this.refs.canvas.getBoundingClientRect();
      const x = ~~(Math.round(event.clientX - rect.left) / this.props.cellSize);
      const y = ~~(Math.round(event.clientY - rect.top) / this.props.cellSize);
      (updatedGrid[x][y]) === 0 ? updatedGrid[x][y] = 1
      : updatedGrid[x][y] = 0;
      this.props.updateCanvas(updatedGrid);
    }

  renderCanvas() {
    // Move all this canvas setup to state at some point ?
    var canvas = this.refs.canvas;
    var cellSize = this.props.cellSize;
    var gridWidth = this.props.gridWidth;
    var gridHeight = this.props.gridHeight;
    canvas.width = gridWidth * cellSize;
    canvas.height = gridHeight * cellSize;
    var ctx = canvas.getContext('2d');
    var scale = canvas.width / gridWidth;
    // Actual rendering
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const tile = this.props.grid[x][y];
          if (tile === 0) ctx.fillStyle = '#211a2f';
          else if (tile === 1) ctx.fillStyle = "#fe534c";
          // Stroking is a bit too expensive
          //ctx.strokeStyle='#000';
          //ctx.strokeRect(x * scale, y * scale, scale, scale);
          ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" onClick={(e) => this.handleCanvasClick(e)}></canvas>
      </div>
    );
  }
}

export default Canvas;
