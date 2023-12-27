# Grid

A JavaScript and TypeScript lib for working with grids of any size and any dimension.

## Usage

### Write a number to each cell in a 2x2 grid

```ts
import { Grid } from '@pomle/grid';

const grid = new Grid<number, 'x' | 'y'>({ x: 2, y: 2 });

let count = 0;
for (const coord of grid) {
  count += 1;
  grid.set(coord, count);
}
```

### Dimensions can use any name

```ts
import { Grid } from '@pomle/grid';

const grid = new Grid({ width: 320, height: 240 });
```

### Dimensions can use any number of dimensions

```ts
import { Grid } from '@pomle/grid';

const grid = new Grid({ a: 10, b: 10, c: 10, d: 10 });
grid.set({ a: 1, b: 1, c: 1, d: 1 }, 'one');
grid.set({ a: 2, b: 2, c: 2, d: 2 }, 'two');
```

### Neighbours can be explored

```ts
import { Grid } from '@pomle/grid';

const grid = new Grid({ x: 3, y: 3 });
for (const coord of grid.neighbours({ x: 1, y: 1 })) {
  console.log(coord); // Prints cartesian product of {x: 0, y: 0} to {x: 2, y: 2}
}
```
