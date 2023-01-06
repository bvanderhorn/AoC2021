import * as h from "../helpers";
var step = (poly:string[], ins:string[][]) : string[] => {
    return h.eArray(poly.length*2+1).map((_,i) => i%2==0 ? poly[i/2] : _)
}
var [poly, ins] = h.read(14, 'polymers.txt');
var insdict = {};
[poly, insdict] = [poly[0].split(''), ins.split(' -> ').reduce((insdict,el:string[]) => (ins[el[0]] = el[1], ins), {})];
h.print(poly);
h.print(ins.slice(0,3));