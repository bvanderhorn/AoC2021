import * as h from "../helpers";
var step = (buckets:number[], ins:string[][]) : number[] => {
  var newb:number[] = h.eArray(buckets.length, 0);
  for (const i of buckets.range()) {
    let [pair,to] = ins[i];
    newb[ins.col(0).indexOf(pair[0]+to)] += buckets[i];
    newb[ins.col(0).indexOf(to+pair[1])] += buckets[i];
  }
  return newb;
}
var btol = (buckets:number[],letters:string[],pairs:string[],poly:string): number[] => letters.map(l => pairs.map((p,i)=> p.split('').count(l)*buckets[i]).sum() + [poly[0],poly.slice(-1)].count(l)).times(1/2);
var [poly, ins] = h.read(14, 'polymers1.txt');
ins = ins.split(' -> ').sort((a:string[],b:string[])=> a[0]<b[0] ? -1 : 1).filter((i:any[]) => i[0] != '');
poly = poly[0];
const pairs = ins.col(0);
const letters = pairs.join('').split('').unique();
var ibuckets: number[] = h.eArray(pairs.length,0);
for (let i=1;i<poly.length;i++) ibuckets[pairs.indexOf(poly.slice(i-1,i+1))]++;
var buckets = ibuckets.copy();
for (const i of h.range(0,10)) buckets = step(buckets,ins);
var fletters = btol(buckets,letters,pairs,poly);
h.print(poly);
h.print(letters);
h.print();
//h.print(pairs.map((p:string,i:number)=> p+ibuckets[i]).filter((p:string) => !p.includes('0')));
h.print('part 1: most common ',fletters.max(),' minus least common ',fletters.min(),' = ',fletters.max() - fletters.min());
