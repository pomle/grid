type Coord<Dimension extends string> = Record<Dimension, number>;

const NEIGHBOURS = [-1, 0, 1];

function* loop<D extends string>(
  dims: string[],
  coords: Record<string, number> = {},
  index = 0,
): Iterable<Coord<D>> {
  const dim = dims.at(index);
  if (dim) {
    for (const offset of NEIGHBOURS) {
      coords[dim] = offset;
      yield* loop(dims, coords, index + 1);
    }
  } else {
    yield { ...coords } as Coord<D>;
  }
}

function* iterate<D extends string>(
  dims: string[],
  size: Record<string, number> = {},
  coords: Record<string, number> = {},
  index = 0,
): Iterable<Coord<D>> {
  const dim = dims.at(index);
  if (dim) {
    const len = size[dim];
    for (let i = 0; i < len; i++) {
      coords[dim] = i;
      yield* iterate(dims, size, coords, index + 1);
    }
  } else {
    yield { ...coords } as Coord<D>;
  }
}

export class Grid<T, D extends string> {
  dims: D[];
  size: Coord<D>;
  data: ArrayLike<T>;

  constructor(size: Coord<D>) {
    this.size = size;
    this.dims = Object.keys(size) as D[];
    let len = 1;
    for (const dim of this.dims) {
      len *= size[dim];
    }
    this.data = new Array(len);
  }

  toIndex(coord: Coord<D>) {
    let index = 0;
    for (const dim of this.dims) {
      index += this.size[dim] * coord[dim];
    }
    return index;
  }

  toCoord(index: number) {
    const coords: Partial<Coord<D>> = {};
    let rest = index;
    for (const dim of this.dims) {
      const size = this.size[dim];
      const stride = Math.floor(rest / size);
      console.log('Stride', stride);
      coords[dim] = stride;
      rest -= index;
    }
    return coords as Coord<D>;
  }

  *neighbours(center: Coord<D>) {
    for (const offset of loop(this.dims)) {
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
