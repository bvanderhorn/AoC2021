import * as h from "../helpers";
var wins = (board:number[][], numbers:number[]) : boolean => (board.map(l => numbers.includesAll(l) ? 1 : 0).sum() > 0) || (board[0].range().map(c => numbers.includesAll(board.col(c)) ? 1 : 0).sum() > 0);
var score =  (board:number[][], numbers:number[]) : number => board.flat().filter(x => !numbers.includes(x)).sum() * numbers.last();
const input = h.read(4,'bingo.txt');
const [numbers, boards] = [input[0][0].split(',').toInt(), input.slice(1).map(b => b.map((line:string) => line.trim().split(/\s+/).toInt()))];

// part 1
for (const n of numbers.range().slice(1)) {
    var winBoards = boards.map(b => wins(b,numbers.slice(0,n)) ? 1: 0);
    if (winBoards.sum() > 0) {
        h.print(score(boards[winBoards.findIndex(i => i === 1)], numbers.slice(0,n)));
        break;
    }
}