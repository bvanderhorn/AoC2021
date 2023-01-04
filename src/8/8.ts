import * as h from "../helpers";
var displays = h.read(8,'displays.txt').map(d => d.split(/\s+\|\s+/).map((h:string)=> h.split(' ')));
var outputs = displays.map(d => d[1]);
h.print('part 1: 1/4/7/8 in output: ',outputs.flat().filter(o => [2,4,3,7].includes(o.length)).length);