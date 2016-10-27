import React from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();

    this.canvasClick = this.canvasClick.bind(this);
    this.processGrid = this.processGrid.bind(this);

    this.state = {
      grid: [],
      gridWidth: 140,
      gridHeight: 80,
      cellSize: 6,
      steps: 0,
      speedMs: 80
    };
  }

  componentWillMount() {
    this.fillRandomGrid();
  }

  canvasClick(grid) {
    this.setState({
      grid: grid
    });
  }

  randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fillEmptyGrid() {
    this.stop();
    const emptyGrid = [];
    for (var i = 0; i < this.state.gridWidth; i++) {
      emptyGrid[i] = [];
      for (var j = 0; j < this.state.gridHeight; j++) {
        emptyGrid[i][j] = 0;
      }
    }
    this.setState({
      grid: emptyGrid,
      steps: 0
    });
  }

  fillRandomGrid() {
    this.stop();
    const randomGrid = []
    for (var i = 0; i < this.state.gridWidth; i++) {
      randomGrid[i] = [];
      for (var j = 0; j < this.state.gridHeight; j++) {
        randomGrid[i][j] = this.randRange(0, 1);
      }
    }
    this.setState({
      grid: randomGrid,
      steps: 0
    });
  }

  // Get next grid step
  processGrid(grid, gridWidth, gridHeight) {
    const nextGrid = [];
    // HELPERS
    // Wrap around grid
    function wrap(index, axis) {
      if (axis === 'x') {
        if (index < 0) {
          return gridWidth + index
        } else if (index === gridWidth) {
          return 0
        } else {
          return index
        }
      }
      if (axis === 'y') {
        if (index < 0) {
          return gridHeight + index
        } else if (index === gridHeight) {
          return 0
        } else {
          return index
        }
      }
    }
    // Returns how many live cells are around
    function countNeighbors(x, y) {
        var count = 0;
          if (grid[wrap(x+1, 'x')][wrap(y, 'y')] === 1) {count += 1}
          if (grid[wrap(x+1, 'x')][wrap(y+1, 'y')] === 1) {count += 1}
          if (grid[wrap(x, 'x')][wrap(y+1, 'y')] === 1) {count += 1}
          if (grid[wrap(x-1, 'x')][wrap(y+1, 'y')] === 1) {count += 1}
          if (grid[wrap(x-1, 'x')][wrap(y, 'y')] === 1) {count += 1}
          if (grid[wrap(x-1, 'x')][wrap(y-1, 'y')] === 1) {count += 1}
          if (grid[wrap(x, 'x')][wrap(y-1, 'y')] === 1) {count += 1}
          if (grid[wrap(x+1, 'x')][wrap(y-1, 'y')] === 1) {count += 1}
        return count;
    }
    // ACTUAL MEAT
    // Copy grid
    for (let x = 0; x < gridWidth; x++) {
      nextGrid[x] = [];
      for (let y = 0; y < gridHeight; y++) {
        nextGrid[x][y] = grid[x][y];
      }
    }
    // Check every cell
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (grid[x][y] === 1 && countNeighbors(x, y) < 2) {
          nextGrid[x][y] = 0;
        }
        if (grid[x][y] === 1 && countNeighbors(x, y) === 2) {
          nextGrid[x][y] = 1;
        }
        if (grid[x][y] === 1 && countNeighbors(x, y) === 3) {
          nextGrid[x][y] = 1;
        }
        if (grid[x][y] === 1 && countNeighbors(x, y) > 3) {
          nextGrid[x][y] = 0;
        }
        if (grid[x][y] === 0 && countNeighbors(x, y) === 3) {
          nextGrid[x][y] = 1;
        }
      }
    }
    return nextGrid;
  }

  // Start interval
  start() {
    var that = this;
    var count = this.state.steps;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(function() {
      count ++;
      that.setState({
        grid: that.processGrid(that.state.grid, that.state.gridWidth, that.state.gridHeight),
        steps: count
      });
    }, that.state.speedMs);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="temp-ui">
          <h1>Generation: {this.state.steps}</h1>
          <button onClick={() => this.start()}>START</button>
          <button onClick={() => this.stop()}>STOP</button>
          <button onClick={() => this.fillRandomGrid()}>RANDOMIZE</button>
          <button onClick={() => this.fillEmptyGrid()}>CLEAR</button>
        </div>
        <Controls />
        <Canvas canvasClick={this.canvasClick} grid={this.state.grid} gridWidth={this.state.gridWidth} gridHeight={this.state.gridHeight} cellSize={this.state.cellSize}/>
        <Footer />
      </div>
    );
  }
}

export default App;
