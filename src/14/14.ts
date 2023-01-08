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
var letters1:number[] = [];
for (const i of h.range(0,40)) {
  buckets = step(buckets,ins);
  if (i==9) letters1 = btol(buckets,letters,pairs,poly);
}
var letters2 = btol(buckets,letters,pairs,poly);
h.print(letters);
h.print('part 1: after 10 steps: most common ',letters1.max(),' minus least common ',letters1.min(),' = ',letters1.max() - letters1.min());
h.print('part 2: after 40 steps: most common ',letters2.max(),' minus least common ',letters2.min(),' = ',letters2.max() - letters2.min());
