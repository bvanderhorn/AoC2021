import * as h from "../helpers";
var dijkstra = (map:number[][], start:number[], end:number[], updates:number) : number => {
  console.time("runtime");
  var [cy, cx] = map.dims();
  var rem : any[] = h.eArray(cy).map((_,i) => h.eArray(cx).map((_,j)=> [i,j])).flat();
  var dist = h.eArray(cy).map((_,i) => h.eArray(cx).map((_,j)=> h.equals2([i,j],start) ? 0 : 10000000));
  var final = h.eArray(cy).map(_ => h.eArray(cx));
  var ctr = 0;
  while (rem.length > 0){
    rem = rem.sort((a,b) => dist[a[0]][a[1]] - dist[b[0]][b[1]]);
    let cur = rem.shift();
    let curDist = dist[cur[0]][cur[1]];
    if (h.equals2(cur,[cy-1,cx-1])) {
      console.timeEnd("runtime");
      return curDist;
    }
    let nb : number[][] = h.getNeighbours(cur,[0,cy-1],[0,cx-1]).filter(n => final[n[0]][n[1]] === undefined);
    for (const n of nb) {
      let [dn, ndist] = [chitons[n[0]][n[1]], dist[n[0]][n[1]]];
      if (ndist > curDist + dn) dist[n[0]][n[1]] = curDist + dn;
    }
    final[cur[0]][cur[1]] = curDist;
    ctr++;
    h.progress(ctr, cx*cy, updates);
  }
  return 0;
}
var chitons = h.read(15, 'chitons.txt').split('').tonum();
h.print('part 1: dist from ',[0,0], ' to ',chitons.dims().plus(-1),' : ', dijkstra(chitons,[0,0],chitons.dims().plus(-1),1));