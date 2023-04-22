import * as h from '../helpers';
var printState = (state: number[][], sub: number|number[] = 0) : void => {
    state.mape( x => [".", ">", "v"][[0,1,2].findIndex(i => i == x)]).printc(x => x == ">", "m","", "\n", sub);
}
var moveRight = (state: number[][], cucumber: number) : number[][] => {
    return state.map((row) => {
        var moveRight = h.range(0, row.length).filter( i => row[i] == cucumber && row[i == row.length -1 ? 0 : i+1] == 0);
        var newRight = moveRight.map(i => i == row.length -1 ? 0 : i+1);
        return row.map((_,i) => moveRight.includes(i) ? 0 : newRight.includes(i) ? cucumber : row[i]);
    });
}
var move = (state: number[][]) : number[][] => moveRight(moveRight(state, 1).transpose(), 2).transpose();

// init
var cucumbers = h.read(25, 'cucumbers.txt').split("").mape( x => [0,1,2][[".", ">", "v"].findIndex(i => i == x)]);

// part 1
var moves = 0;
var currentState = cucumbers;
console.time("day 25 part 1");
while(true) {
    moves++;
    if (moves % 50 == 0) h.print(" move " + moves + " ...");
    var newState = move(currentState);
    if (h.equals2(newState, currentState)) break;
    currentState = newState;
}
h.print(" cucumbers stopped moving after " + moves + " moves : ");
printState(currentState);
console.timeEnd("day 25 part 1");
