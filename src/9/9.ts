import * as h from "../helpers";
var isLocalMin = (map:number[][], pos:number[], dy: number[], dx:number[]) : boolean => {
    var nb = h.getNeighbours(pos,dy, dx).map(n => map[n[0]][n[1]] > map[pos[0]][pos[1]] ? 1 : 0);
    return nb.sum() == nb.length;
}
var map: number[][] = h.read(9,'map.txt').map(l => l.split('').toInt());
var [dy, dx] = [[0,map.length-1], [0, map[0].length-1]];
h.print('part 1: sum of local minima risk levels: ',map.map((l,i) => l.map((p,j) => isLocalMin(map, [i,j], dy, dx) ? p+1 : 0)).sum1().sum());

// part 2
var backlog = map.map((l,i) => l.map((p,j) => p != 9 ? [i,j] : [-1,-1])).flat().filter(c => c[0] != -1);
let basins: number[][][] = [], curBasin: number[][] = [], todo: number[][] = [];
let curPos: number[] = backlog.shift() ?? [-1,-1];
while (true) {
    let nb = h.getNeighbours(curPos, dy, dx).filter(n => map[n[0]][n[1]] != 9 && !curBasin.includes2(n) && !todo.includes2(n));
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
var basinsCount = basins.map(b => b.length).sortInt().reverse();
h.print('part 2: three largest basins: ',basinsCount.slice(0,3),', product: ',basinsCount.slice(0,3).prod());