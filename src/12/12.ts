import * as h from "../helpers";
var getPathsFrom = (caves:any[], path: string[]) : string[][] => {
    if (path.last() === 'end') return [path];
    var upper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    var nb = caves.filter(c => c[0] === path.last())[0][1].filter((n:string) => upper.includes(n[0]) || !path.includes(n));
    if (nb.length === 0) return [];
    var paths: string[][] = [];
    for (const n of nb) paths = paths.concat(getPathsFrom(caves, [...path, n]));
    return paths;
}
var links = h.read(12,'caves.txt').split('-');
var caves = links.flat().unique().map(c => [c, links.filter(l => l.includes(c)).flat().filter(l => l != c).sort()]);
h.print(caves.sort((a,b) => a[1].length > b[1].length ? -1 : 1));
var paths = getPathsFrom(caves,['start']);
h.print('part 1: # found paths: ',paths.length);