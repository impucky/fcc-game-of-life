import React from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.canvasClick = this.canvasClick.bind(this);
    this.wrap = this.wrap.bind(this);
    this.countNeighbors = this.countNeighbors.bind(this);
    this.stepGrid = this.stepGrid.bind(this);
    this.start = this.start.bind(this);

    this.state = {
      grid: [],
      gridWidth: 80,
      gridHeight: 40,
      steps: 0,
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

  stepGrid(grid, gridW, gridH) {
    const nextGrid = [];

    // Copy grid
    for (let x = 0; x < gridW; x++) {
      nextGrid[x] = [];
      for (let y = 0; y < gridH; y++) {
        nextGrid[x][y] = grid[x][y];
      }
    }
    // Check every cell
    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        if (grid[x][y] === 1 && this.countNeighbors(grid, x, y) < 2) {;
          nextGrid[x][y] = 0;
        }
        if (grid[x][y] === 1 && this.countNeighbors(grid, x, y) === 2) {
          nextGrid[x][y] = 1;
        }
        if (grid[x][y] === 1 && this.countNeighbors(grid, x, y) === 3) {
          nextGrid[x][y] = 1;
        }
        if (grid[x][y] === 1 && this.countNeighbors(grid, x, y) > 3) {
          nextGrid[x][y] = 0;
        }
        if (grid[x][y] === 0 && this.countNeighbors(grid, x, y) === 3) {
          nextGrid[x][y] = 1;
        }
      }
    }
    return nextGrid
  }

  countNeighbors(grid, x, y) {
      var count = 0;
        if (grid[this.wrap(x+1, 'x')][this.wrap(y, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x+1, 'x')][this.wrap(y+1, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x, 'x')][this.wrap(y+1, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x-1, 'x')][this.wrap(y+1, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x-1, 'x')][this.wrap(y, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x-1, 'x')][this.wrap(y-1, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x, 'x')][this.wrap(y-1, 'y')] === 1) {count += 1}
        if (grid[this.wrap(x+1, 'x')][this.wrap(y-1, 'y')] === 1) {count += 1}
      return count;
  }

  wrap(index, axis) {
    if (axis === 'x') {
      if (index < 0) {
        return this.state.gridWidth + index
      } else if (index === this.state.gridWidth) {
        return 0
      } else {
        return index
      }
    }
    if (axis === 'y') {
      if (index < 0) {
        return this.state.gridHeight + index
      } else if (index === this.state.gridHeight) {
        return 0
      } else {
        return index
      }
    }
  }

  fillEmptyGrid() {
    const emptyGrid = [];
    for (var i = 0; i < this.state.gridWidth; i++) {
      emptyGrid[i] = [];
      for (var j = 0; j < this.state.gridHeight; j++) {
        emptyGrid[i][j] = 0;
      }
    }
    this.setState({
      grid: emptyGrid
    });
  }

  fillRandomGrid() {
    const randomGrid = []
    for (var i = 0; i < this.state.gridWidth; i++) {
      randomGrid[i] = [];
      for (var j = 0; j < this.state.gridHeight; j++) {
        randomGrid[i][j] = this.randRange(0, 1);
      }
    }
    this.setState({
      grid: randomGrid
    });
  }

  start() {
    var self = this;
    setInterval(function() {
      self.setState({
        grid: self.stepGrid(self.state.grid, self.state.gridWidth, self.state.gridHeight)
      });
    }, 80);
  }

  render() {
    return (
      <div>
        <Header />
        <button onClick={() => this.start()}>STEP</button>
        <Canvas canvasClick={this.canvasClick} grid={this.state.grid} gridWidth={this.state.gridWidth} gridHeight={this.state.gridHeight} />
        <Footer />
      </div>
    );
  }
}

export default App;
