import * as h from "../helpers";
var isLocalMin = (map:number[][], pos:number[]) : boolean => {
    var [dy, dx] = [[0,map.length-1], [0, map[0].length-1]];
    var nb = h.getNeighbours(pos,dy, dx).map(n => map[n[0]][n[1]] > map[pos[0]][pos[1]] ? 1 : 0);
    return nb.sum() == nb.length;
}
var map: number[][] = h.read(9,'map.txt').map(l => l.split('').map((c:string) => +c));
h.print('part 1: sum of local minima risk levels: ',map.map((l,i) => l.map((p,j) => isLocalMin(map, [i,j]) ? p+1 : 0)).sum1().sum());