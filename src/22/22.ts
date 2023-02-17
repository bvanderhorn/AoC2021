import * as h from '../helpers';
var input = h.read(22,'cubes.txt').split(',').split('..').mape(x => x.replace(/[\s\S]*=/,'')).tonum();
h.print(input.slice(0,3));
