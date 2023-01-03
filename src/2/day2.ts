import * as h from "../helpers";

// functions
var inDir = (input:string[], direction:string) : number  => {
    var sub = input.filter(el => el.includes(direction));
    sub.push(' 0');
    return sub.map(el => +el.split(' ')[1]).sum();
} 

// parse
var input = h.read(2,'instructions.txt');

// part 1
var xy: number[] = [inDir(input,'forward'), inDir(input,'down') - inDir(input,'up')];
h.print('final position: ', xy);
h.print('multiplied: ', xy.multiply());

// part 2
var m = input.map((el,i) => (inDir(input.slice(0,i+1),'down') - inDir(input.slice(0,i+1),'up'))*(+el.split(' ')[1]) );
xy = [inDir(input,'forward'), m.map((el,i) => input[i].includes('forward') ? el : 0).sum()];
h.print(' new final position: ',xy)
h.print('multiplied: ', xy.multiply());