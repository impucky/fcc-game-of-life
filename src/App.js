import React from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();

    this.updateCanvas = this.updateCanvas.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.fillEmptyGrid = this.fillEmptyGrid.bind(this);
    this.fillRandomGrid = this.fillRandomGrid.bind(this);

    this.state = {
      grid: [],
      gridWidth: 120,
      gridHeight: 60,
      cellSize: 7,
      steps: 0,
      speedMs: 90,
      gameIsRunning: false
    };
  }

  componentWillMount() {
    this.fillRandomGrid();
    this.start();
  }

  updateCanvas(grid) {
    this.setState({
      grid: grid
    });
  }

  updateGridSize(w, h) {
    if (w !== this.state.gridWidth && h !== this.state.gridHeight) {
      this.setState({
        gridWidth: w,
        gridHeight: h
      }, this.fillRandomGrid);
    }
  }

  updateSpeed(speed) {
    this.setState({
      speedMs: speed
    }, function() {
      if (this.state.gameIsRunning) {this.start()}
    });
  }

  fillEmptyGrid() {
    this.stop();
    const emptyGrid = [];
    for (let x = 0; x < this.state.gridWidth; x++) {
      emptyGrid[x] = [];
      for (let y = 0; y < this.state.gridHeight; y++) {
        emptyGrid[x][y] = 0;
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
    for (let x = 0; x < this.state.gridWidth; x++) {
      randomGrid[x] = [];
      for (let y = 0; y < this.state.gridHeight; y++) {
        randomGrid[x][y] = this.randRange(0, 1);
      }
    }
    this.setState({
      grid: randomGrid,
      steps: 0
    });
  }

  randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Get next grid step
  processGrid(grid, gridWidth, gridHeight) {
    const nextGrid = [];
    // Wrap around
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
          if (grid[wrap(x+1, 'x')][wrap(y, 'y')] === 1) count += 1
          if (grid[wrap(x+1, 'x')][wrap(y+1, 'y')] === 1) count += 1
          if (grid[wrap(x, 'x')][wrap(y+1, 'y')] === 1) count += 1
          if (grid[wrap(x-1, 'x')][wrap(y+1, 'y')] === 1) count += 1
          if (grid[wrap(x-1, 'x')][wrap(y, 'y')] === 1) count += 1
          if (grid[wrap(x-1, 'x')][wrap(y-1, 'y')] === 1) count += 1
          if (grid[wrap(x, 'x')][wrap(y-1, 'y')] === 1) count += 1
          if (grid[wrap(x+1, 'x')][wrap(y-1, 'y')] === 1) count += 1
        return count;
    }
    // Copy grid => nextGrid
    for (let x = 0; x < gridWidth; x++) {
      nextGrid[x] = [];
      for (let y = 0; y < gridHeight; y++) {
        nextGrid[x][y] = grid[x][y];
      }
    }
    // Check every cell and update nextGrid
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

  // Start game
  start() {
    // Ref to this for access in interval
    const that = this;
    // Clear interval in case it's already running
    clearInterval(this.intervalId);

    let count = this.state.steps;
    this.intervalId = setInterval(function() {
      count ++;
      that.setState({
        grid: that.processGrid(that.state.grid, that.state.gridWidth, that.state.gridHeight),
        steps: count,
        gameIsRunning: true
      });
    }, that.state.speedMs);
  }

  // Stop game
  stop() {
    clearInterval(this.intervalId);
    this.setState({
      gameIsRunning: false
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Canvas updateCanvas={this.updateCanvas}
                grid={this.state.grid}
                gridWidth={this.state.gridWidth}
                gridHeight={this.state.gridHeight}
                cellSize={this.state.cellSize}/>
        <Controls start={this.start}
                  stop={this.stop}
                  clear={this.fillEmptyGrid}
                  randomize={this.fillRandomGrid}
                  updateGridSize={this.updateGridSize}
                  updateSpeed={this.updateSpeed}
                  steps={this.state.steps}
                  gameIsRunning={this.state.gameIsRunning}
                  gridWidth={this.state.gridWidth}
                  gridHeight={this.state.gridHeight}/>
        <Footer />
      </div>
    );
  }
}

export default App;
