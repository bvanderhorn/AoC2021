import * as h from "../helpers";

// functions
var inDir = (input:string[], direction:string) : number  => input.filter(el => el.includes(direction)).map(el => +el.split(' ')[1]).sum();

// parse
var input = h.read(2,'instructions.txt');

// part 1
var xy: number[] = [inDir(input,'forward'), inDir(input,'down') - inDir(input,'up')];
h.print('final position: ', xy);
h.print('multiplied: ', xy.multiply());