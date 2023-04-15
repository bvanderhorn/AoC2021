# AoC2021
Advent of Code 2021. Mainly used to create helper functions for upcoming AoC's.

## How to set up the TypeScript project
1. In main repo folder, run:

```shell
npm install --save-dev typescript @types/node fs
```

2. copy `tsconfig.json`, `.gitignore`
3. `Ctrl` + `Shift` + `B` -> 'watch'

## How to create and run the script for a given day
1. Place `helper.ts` in `src` folder
1. Create `dayX.ts` file in `src/X`
2. `cd out/X`
3. `node dayX.js`
