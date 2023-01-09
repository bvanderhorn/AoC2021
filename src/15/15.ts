import * as h from "../helpers";
var dijkstra = (map:number[][], start:number[], end:number[], updates:number) : number => {
  console.time("runtime");
  var [cy, cx] = map.dims();
  var final: number[][] = h.ea([cy,cx]), rem: any[] = [start], inf = 10000000, ctr = 0;
  var dist: number[][] = h.ea([cy,cx],inf);
  dist[start[0]][start[1]] = 0;  
  while (rem.length > 0){
    rem = rem.sort((a,b) => dist[a[0]][a[1]] - dist[b[0]][b[1]]);
    let cur = rem.shift();
    let curDist = dist[cur[0]][cur[1]];
    if (h.equals2(cur, end)) {
      console.timeEnd("runtime");
      return curDist;
    }
    let nb : number[][] = h.getnb(cur,[0,cy-1],[0,cx-1]).filter(n => final[n[0]][n[1]] === undefined);
    for (const n of nb) {
      let [dn, ndist] = [map[n[0]][n[1]], dist[n[0]][n[1]]];
      if (ndist === inf) rem.push(n);
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

var chitons2 = chitons.map(c => c.concat(c.plus(1)).concat(c.plus(2)).concat(c.plus(3)).concat(c.plus(4)));
chitons2 = chitons2.concat(chitons2.plus(1)).concat(chitons2.plus(2)).concat(chitons2.plus(3)).concat(chitons2.plus(4));
chitons2 = chitons2.mod(9).mape(c=> c === 0 ? 9 : c);
h.print('part 2: dist from ',[0,0], ' to ',chitons2.dims().plus(-1),' : ', dijkstra(chitons2,[0,0],chitons2.dims().plus(-1),10));