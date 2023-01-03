import * as h from "../helpers";
var input = h.read(3,'binaries.txt');

// part 1
var sums = input.map(el => el.split('').map((x:string) => +x)).sum0();
const gamma = sums.map((el:number) => (el > (input.length/2)) ? 1 : 0);
const gNum = parseInt(gamma.join(''),2);
const epsilon = gamma.map((el:number) => 1- el);
const eNum = parseInt(epsilon.join(''),2);

h.print(sums);
h.print(gamma.join(''));
h.print(epsilon.join(''));
h.print(gNum*eNum);

// part 2