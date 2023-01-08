import * as h from "../helpers";
var chitons = h.read(15, 'chitons.txt').split('').tonum();
h.print(chitons.slice(0,2));
var [cy, cx] = [chitons.length, chitons[0].length];
var rem : any[] = h.eArray(cy).map((_,i) => h.eArray(cx).map((_,j)=> [[i,j],(i===0 && j===0) ? 0 : 10000000])).flat();
var vst: any[] = [], ctr = 0;

//rem = rem.sort((a,b) => a[1] - b[1]);
//let cur2 = rem.shift();
//h.print(cur2);

//throw new Error();

while (rem.length > 0){
  rem = rem.sort((a,b) => a[1] - b[1]);
  let cur = rem.shift();
  if (ctr < 10) h.print(cur);
  if (h.equals2(cur[0],[cy-1,cx-1])) h.print('part 1: ',cur);
  let vstc = vst.map(v => v[0]);
  let nb : number[][] = h.getNeighbours(cur[0],[0,cy-1],[0,cx-1]).filter(n => !vstc.includes2(n));
  if (ctr < 10) h.print(nb);
  for (const n of nb) {
    let dn = chitons[n[0]][n[1]];
    let cn = rem[rem.findIndex(r => h.equals2(r[0],n))];
    if (cn[1] > cur[1] + dn) cn[1]  = cur[1] + dn;
  }
  vst.push(cur);
  ctr++;
  h.progress(ctr, cx*cy);
}
