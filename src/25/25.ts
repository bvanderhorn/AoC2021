import * as h from '../helpers';
var printState = (cucumbers: number[][], sub: number|number[] = 0) : void => {
    cucumbers.mape( x => [".", ">", "v"][[0,1,2].findIndex(i => i == x)]).printc(x => x == ">", "m","", "\n", sub);
}

// init
var cucumbers = h.read(25, 'cucumbers.txt').split("").mape( x => [0,1,2][[".", ">", "v"].findIndex(i => i == x)]);

printState(cucumbers, 10);
