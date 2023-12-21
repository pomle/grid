import { Grid } from '../grid';

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

  it.skip('resolves expected coord for one dimension', () => {
    const grid = new Grid({ x: 5 });
    expect(grid.toCoord(0)).toEqual({ x: 0 });
    expect(grid.toCoord(1)).toEqual({ x: 1 });
    expect(grid.toCoord(4)).toEqual({ x: 4 });
  });

  it.skip('resolves expected coord for two dimension', () => {
    const grid = new Grid({ x: 5, y: 5 });
    expect(grid.toCoord(0)).toEqual({ x: 0, y: 0 });
    expect(grid.toCoord(1)).toEqual({ x: 0, y: 1 });
    expect(grid.toCoord(5)).toEqual({ x: 1, y: 0 });
  });
});
