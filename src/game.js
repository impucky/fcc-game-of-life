export function stepGrid(grid, gridW, gridH) {
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
      if (grid[x][y] === 1 && countNeighbors(grid, x, y) < 2) {;
        nextGrid[x][y] = 0;
      }
      if (grid[x][y] === 1 && countNeighbors(grid, x, y) === 2) {
        nextGrid[x][y] = 1;
      }
      if (grid[x][y] === 1 && countNeighbors(grid, x, y) === 3) {
        nextGrid[x][y] = 1;
      }
      if (grid[x][y] === 1 && countNeighbors(grid, x, y) > 3) {
        nextGrid[x][y] = 0;
      }
      if (grid[x][y] === 0 && countNeighbors(grid, x, y) === 3) {
        nextGrid[x][y] = 1;
      }
    }
  }
  return nextGrid
}

export function countNeighbors(grid, x, y) {
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

export function wrap(index, axis) {
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
