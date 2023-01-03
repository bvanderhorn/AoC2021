import * as h from "../helpers";

// functions
function inDir(input:string[], direction:string) : number {
    return input.filter(el => el.includes(direction)).map(el => +el.split(' ')[1]).reduce((a,b) => a+b,0);
}

// params
var inputFile = 'instructions.txt';

// parse
var input = h.read(2,inputFile);

// part 1
var x = inDir(input,'forward');
var depth = inDir(input,'down') - inDir(input,'up');
h.print('final position: ['+ x.toString() + ', ' + (-depth).toString() + ']');
h.print('multiplied: ' + (x*depth).toString());