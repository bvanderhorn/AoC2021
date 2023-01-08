import * as h from "../helpers";
var upper = 'QWERTYUIOPASDFGHJKLZXCVBNM';
var noDoubleSmalls = (path:string[]) : boolean => path.filter(c => !upper.includes(c[0])).map(c => path.count(c)).max() <= 1;
var getPathsFrom = (caves:any[], path: string[], part: number) : string[][] => {
    if (path.last() === 'end') return [path];
    var nb = caves.dict(path.last()).filter( 
        (n:string) => upper.includes(n[0]) || !path.includes(n) || (part === 2 && n !== 'start' && noDoubleSmalls(path)) );
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