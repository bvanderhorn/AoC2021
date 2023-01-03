import * as h from "../helpers";

var majorities = (arr: number[][]) : number[] => arr.sum0().map((el:number) => (el >= (arr.length/2)) ? 1 : 0);
var minorities = (arr: number[][]) : number[] => majorities(arr).map((el:number) => 1- el);

var input = h.read(3,'binaries.txt');

// part 1
const arrays = input.map(el => el.split('').map((x:string) => +x));
var sums = arrays.sum0();
const gamma = majorities(arrays);
const epsilon = minorities(arrays);

h.print(sums);
h.print(gamma.join(''));
h.print(epsilon.join(''));
h.print(parseInt(gamma.join(''),2)*parseInt(epsilon.join(''),2));

// part 2
var ox = arrays.map(el => el);
for (let i=0; i<ox[0].length; i++) ox = ox.filter(el => el[i] === majorities(ox)[i]);
var co = arrays.map(el => el);
for (let i=0; i<co[0].length; i++) {
    co = co.filter(el => el[i] === minorities(co)[i]);
    if (co.length === 1) break;
}

h.print(ox[0].join(''));
h.print(co[0].join(''));
h.print(parseInt(ox[0].join(''),2)*parseInt(co[0].join(''),2));