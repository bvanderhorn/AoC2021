import * as h from "../helpers";

var majorities = (arr: number[][]) : number[] => arr.sum0().map((el:number) => (el >= (arr.length/2)) ? 1 : 0);
var minorities = (arr: number[][]) : number[] => majorities(arr).map((el:number) => 1- el);

var input = h.read(3,'binaries.txt');

// part 1
const arrays = input.map(el => el.split('').map((x:string) => +x));
const gamma = majorities(arrays).join('');
const epsilon = minorities(arrays).join('');

h.print(arrays.sum0());
h.print(gamma);
h.print(epsilon);
h.print(parseInt(gamma,2)*parseInt(epsilon,2));

// part 2
var ox = arrays.map(el => el);
for (let i=0; i<ox[0].length; i++) ox = ox.filter(el => el[i] === majorities(ox)[i]);
var co = arrays.map(el => el);
for (let i=0; i<co[0].length; i++) {
    co = co.filter(el => el[i] === minorities(co)[i]);
    if (co.length === 1) break;
}
var [oxS, coS] = [ox[0].join(''), co[0].join('')];
h.print(oxS+'\r\n'+coS);
h.print(parseInt(oxS,2)*parseInt(coS,2));