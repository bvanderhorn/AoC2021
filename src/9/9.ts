import * as h from "../helpers";
var isLocalMin = (map:number[][], pos:number[], dy: number[], dx:number[]) : boolean => {
    var nb = h.getnb(pos,dy, dx).map(n => map[n[0]][n[1]] > map[pos[0]][pos[1]] ? 1 : 0);
    return nb.sum() == nb.length;
}
var map: number[][] = h.read(9,'map.txt').split('').tonum();
var [dy, dx] = [[0,map.length-1], [0, map[0].length-1]];
h.print('part 1: sum of local minima risk levels: ',map.mapij((i,j,p) => isLocalMin(map, [i,j], dy, dx) ? p+1 : 0).sum1().sum());

// part 2
var backlog = map.mapij((i,j,p) => p != 9 ? [i,j] : [-1,-1]).flat().filter(c => c[0] != -1);
let basins: number[][][] = [], curBasin: number[][] = [], todo: number[][] = [];
let curPos: number[] = backlog.shift() ?? [-1,-1];
while (true) {
    let nb = h.getnb(curPos, dy, dx).filter(n => map[n[0]][n[1]] != 9 && !curBasin.includes2(n) && !todo.includes2(n));
    backlog = backlog.filter(b => !nb.includes2(b));
    todo.push(...nb);
    curBasin.push(curPos);
    if (todo.length == 0) {
        basins.push(curBasin);
        curBasin = [];
        if (backlog.length == 0) break;
        todo.push(backlog.shift() ?? [-1,-1]);
    }
    curPos = todo.shift() ?? [-1,-1];
}
var basinsCount = basins.map(b => b.length).sortnum().reverse();
h.print('part 2: three largest basins: ',basinsCount.slice(0,3),', product: ',basinsCount.slice(0,3).prod());