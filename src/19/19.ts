import * as h from "../helpers";
var scanners = h.read(19,'scanners.txt').subfilter(l => !l.includes('scanner')).split(',').tonum();
h.print(scanners.slice(0,2));
h.print(scanners.map(s => s.length));