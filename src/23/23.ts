import * as h from '../helpers';
var types = 'ABCD';
var input = h.read(23,'amphipods.txt').mape(l => l.replace(/[\W]/g,'').replace(/\w/g, (m:string) => types.indexOf(m))).filter(l => l).reverse().split('').transpose().tonum();
h.print(input);

var alley : number[] = h.ea(11);

h.print(alley);

// full search
var entryPoint = (i: number) => 2 + 2*i;
var entryPoints = h.range(0, input.length).map(r => entryPoint(r));
var rests : number[] = h.range(0,alley.length).filter(i => !entryPoints.includes(i));

h.print(input[0].last());
h.print(entryPoints);
h.print(rests);

