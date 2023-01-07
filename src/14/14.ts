import * as h from "../helpers";
var step = (poly:string[], ins:string[][]) : string[] => {
    return h.eArray(poly.length*2+1).map((_,i) => i%2==0 ? poly[i/2] : _)
}
var [poly, ins] = h.read(14, 'polymers1.txt');
ins = ins.split(' -> ').sort((a:string[],b:string[])=> a[0]<b[0] ? -1 : 1).filter((i:any[]) => i[0] != '');
poly = poly[0];
var pairs = ins.col(0).sort();
var letters = pairs.join('').split('').unique();
var ibuckets: number[] = h.eArray(pairs.length,0);
for (let i=1;i<poly.length;i++) ibuckets[pairs.indexOf(poly.slice(i-1,i+1))]++;
h.print(poly);
h.print(ins);
h.print(pairs.length);
h.print(letters);
h.print(pairs);
h.print(ibuckets);
