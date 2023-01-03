import * as h from "../helpers";

// functions
function inDir(input:string[], direction:string) : number {
    return input.filter(el => el.includes(direction)).map(el => +el.split(' ')[1]).sum();
}

// params
var inputFile = 'instructions.txt';

// parse
var input = h.read(2,inputFile);

// part 1
var xy: number[] = [inDir(input,'forward'), inDir(input,'down') - inDir(input,'up')];
h.print('final position: '+ xy);
h.print('multiplied: ' + xy.multiply());