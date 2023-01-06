import * as h from "../helpers";
var links = h.read(12,'caves.txt').split('-');
var caves = links.flat().unique().map(c => [c, links.filter(l => l.includes(c)).flat().filter(l => l != c).sort()]);
h.print(links);
h.print(caves.sort((a,b) => a[1].length > b[1].length ? -1 : 1)); 