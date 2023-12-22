import { Grid, gridIndex, linearIndex } from '../grid';

describe('linear', () => {
  it('creates a unique linear index for each coord', () => {
    const size = { x: 30, y: 60, z: 90 };
    const grid = new Grid(size);
    const indices = new Set<number>();
    for (const coord of grid) {
      const index = linearIndex(size, coord);
      indices.add(index);
    }
    expect(indices.size).toEqual(30 * 60 * 90);
  });
});

describe('gridIndex', () => {
  it('resolves expected coord for each linear index', () => {
    const size = { x: 30, y: 60, z: 90 };
    const grid = new Grid(size);
    for (const coord of grid) {
      const index = linearIndex(size, coord);
      const resolved = gridIndex(size, index);
      expect(resolved).toEqual(coord);
    }
  });
});

describe('Grid', () => {
  it('iterates over each neighbour coord in 1D', () => {
    const grid = new Grid({ x: 3 });
    expect([...grid.neighbours({ x: 2 })]).toEqual([
      { x: 1 },
      { x: 2 },
      { x: 3 },
    ]);
  });

  it('iterates over each neighbour coord in 2D', () => {
    const grid = new Grid({ x: 3, y: 3 });
    expect([...grid.neighbours({ x: 1, y: 1 })]).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  it('iterates over cells in 1D', () => {
    const grid = new Grid({ x: 3 });
    expect([...grid]).toEqual([{ x: 0 }, { x: 1 }, { x: 2 }]);
  });

  it('iterates over cells in 2D', () => {
    const grid = new Grid({ x: 2, y: 2 });
    expect([...grid]).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]);
  });

  it('builds expected index for 1D', () => {
    const grid = new Grid({ x: 5 });
    expect(grid.toIndex({ x: 0 })).toEqual(0);
    expect(grid.toIndex({ x: 4 })).toEqual(4);
  });

  it('builds expected index for 2D', () => {
    const grid = new Grid({ x: 100, y: 20 });
    expect(grid.toIndex({ x: 1, y: 0 })).toEqual(100);
    expect(grid.toIndex({ x: 10, y: 9 })).toEqual(1009);
  });

  it('resolves expected coord for one dimension', () => {
    const grid = new Grid({ x: 5 });
    expect(grid.toCoord(0)).toEqual({ x: 0 });
    expect(grid.toCoord(1)).toEqual({ x: 1 });
    expect(grid.toCoord(4)).toEqual({ x: 4 });
  });

  it('resolves expected coord for two dimension', () => {
    const grid = new Grid({ x: 10, y: 100, z: 1000 });
    const index = grid.toIndex({ x: 5, y: 20, z: 500 });
    console.log('Index', index);
    expect(grid.toCoord(index)).toEqual({ x: 5, y: 20, z: 500 });
  });
});
