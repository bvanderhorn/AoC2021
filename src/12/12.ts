import * as h from "../helpers";
var getPathsFrom = (caves:any[], path: string[], part: number) : string[][] => {
    if (path.last() === 'end') return [path];
    var upper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    var nb = caves.filter(c => c[0] === path.last())[0][1].filter((n:string) => upper.includes(n[0]) || (
         (part === 1 && !path.includes(n)) ||
         (part === 2 && (n !== 'start' && (!path.includes(n) || path.filter(c => !upper.includes(c[0])).map(c => path.count(c)).max() <= 1)))
    ));
    if (nb.length === 0) return [];
    var paths: string[][] = [];
    for (const n of nb) paths = paths.concat(getPathsFrom(caves, [...path, n], part));
    return paths;
}
var links = h.read(12,'caves.txt').split('-');
var caves = links.flat().unique().map(c => [c, links.filter(l => l.includes(c)).flat().filter(l => l != c).sort()]);
h.print(caves.sort((a,b) => a[1].length > b[1].length ? -1 : 1));
h.print('part 1: # found paths: ',getPathsFrom(caves,['start'], 1).length);
h.print('part 2: # found paths: ',getPathsFrom(caves,['start'], 2).length);