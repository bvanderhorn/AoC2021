import * as h from "../helpers";
const input = h.read(4,'bingo.txt');
const [numbers, boards] = [input[0][0].split(',').toInt(), input.slice(1).map(b => b.map((line:string) => line.trim().split(/\s+/).toInt()))];
// h.print(numbers);
// h.print(boards.slice(0,2));

// part 1   