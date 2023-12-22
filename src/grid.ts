type Coord<Dimension extends string> = Record<Dimension, number>;

const NEIGHBOURS = [-1, 0, 1];

function* neighbours<Dim extends string>(
  dims: string[],
  coords: Record<string, number> = {},
  index = 0,
): Iterable<Coord<Dim>> {
  const dim = dims.at(index);
  if (dim) {
    for (const offset of NEIGHBOURS) {
      coords[dim] = offset;
      yield* neighbours(dims, coords, index + 1);
    }
  } else {
    yield { ...coords } as Coord<Dim>;
  }
}

function* iterate<Dim extends string>(
  dims: string[],
  size: Record<string, number> = {},
  coords: Record<string, number> = {},
  index = 0,
): Iterable<Coord<Dim>> {
  const dim = dims.at(index);
  if (dim) {
    const len = size[dim];
    for (let i = 0; i < len; i++) {
      coords[dim] = i;
      yield* iterate(dims, size, coords, index + 1);
    }
  } else {
    yield { ...coords } as Coord<Dim>;
  }
}

export function linearIndex<Dim extends string>(
  size: Record<Dim, number>,
  coord: Record<Dim, number>,
) {
  const dims = Object.keys(size) as Dim[];
  const multipliers: number[] = [1];

  let index = 0;
  for (const dim of dims) {
    let stride = coord[dim];
    for (const m of multipliers) {
      stride *= m;
    }
    index += stride;
    multipliers.push(size[dim]);
  }
  return index;
}

export function gridIndex<Dim extends string>(
  size: Record<Dim, number>,
  index: number,
) {
  const dims = Object.keys(size) as Dim[];
  const multipliers: number[] = [];

  const coord: Partial<Record<Dim, number>> = {};

  for (const dim of dims) {
    let divisor = 1;
    for (const m of multipliers) {
      divisor *= m;
    }

    coord[dim] = Math.floor(index / divisor) % size[dim];
    multipliers.push(size[dim]);
  }

  return coord;
}

export function grid(size: Record<'x' | 'y' | 'z', number>, index: number) {
  const coord: Partial<Record<'x' | 'y' | 'z', number>> = {};

  coord.x = index % size.x;
  coord.y = (index / size.x) % size.y;
  coord.z = (index / (size.x * size.y)) % size.z;

  return coord;
}

export class Grid<T, Dim extends string> {
  dims: Dim[];
  size: Coord<Dim>;
  data: Array<T>;

  constructor(size: Coord<Dim>) {
    this.size = size;
    this.dims = Object.keys(size) as Dim[];
    let len = 1;
    for (const dim of this.dims) {
      len *= size[dim];
    }
    this.data = new Array(len);
  }

  toIndex(coord: Coord<Dim>) {
    return linearIndex(this.size, coord);
  }

  toCoord(index: number) {
    return gridIndex(this.size, index);
  }

  get(coord: Coord<Dim>): T | undefined {
    const index = this.toIndex(coord);
    return this.data[index];
  }

  set(coord: Coord<Dim>, value: T) {
    const index = this.toIndex(coord);
    this.data[index] = value;
  }

  delete(coord: Coord<Dim>) {
    const index = this.toIndex(coord);
    delete this.data[index];
  }

  *neighbours(center: Coord<Dim>) {
    for (const offset of neighbours(this.dims)) {
      for (const dim of this.dims) {
        offset[dim] += center[dim];
      }
      yield offset;
    }
  }

  *[Symbol.iterator]() {
    yield* iterate(this.dims, this.size, {});
  }
}
