import * as h from "../helpers";
var wins = (board:number[][], numbers:number[]) : boolean => (board.map(l => numbers.includesAll(l) ? 1 : 0).sum() > 0) || (board[0].range().map(c => numbers.includesAll(board.col(c)) ? 1 : 0).sum() > 0);
var score =  (board:number[][], numbers:number[]) : number => board.flat().filter(x => !numbers.includes(x)).sum() * numbers.last();
const input = h.read(4,'bingo.txt');
const [numbers, boards] = [input[0][0].split(',').tonum(), input.slice(1).trim().split(/\s+/).tonum()];

// part 1/2
var foundPart1 = false;
var prevWinBoards = new Array(boards.length).fill(0);
for (const n of numbers.range(1)) {
    var winBoards = boards.map(b => wins(b,numbers.slice(0,n)) ? 1: 0);
    if ((winBoards.sum() == 1) && (!foundPart1)) {
        h.print('part 1 score: ',score(boards[winBoards.findIndex(i => i === 1)], numbers.slice(0,n)));
        foundPart1 = true;
    }
    if (winBoards.sum() == boards.length) {
        h.print('part 2 score: ',score(boards[prevWinBoards.findIndex(i => i == 0)],numbers.slice(0,n)));
        break;
    }
    prevWinBoards = winBoards.map(el => el);
}