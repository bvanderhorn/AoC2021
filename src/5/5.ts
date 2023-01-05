import * as h from "../helpers";
var isHorVert = (range:number[][]) : boolean => (range[0][0] == range[1][0]) || (range[0][1] == range[1][1]);
var minMax = (range:number[][]) : number[][] => [[range[0][0],range[1][0]].sort((a,b)=> a-b), [range[0][1],range[1][1]].sort((a,b)=> a-b)];
var possibleOverlap = (range1:number[][], range2:number[][]) : boolean => {
    var [dx1, dy1, dx2, dy2] = minMax(range1).concat(minMax(range2));
    return h.overlaps(dx1, dx2) && h.overlaps(dy1, dy2);
}
var expandDiagonally = (c1:number[], c2:number[]) : number[][] => {
    var len = Math.abs(c1[0]-c2[0]) + 1;
    var [dx, dy] = [(c2[0]-c1[0])/(len-1), (c2[1]-c1[1])/(len-1)];
    return h.rangee(0,len).map(i => [c1[0] + i*dx, c1[1] + i*dy]);
}
var superExpand = (range:number[][]) : number[][] => isHorVert(range) ? h.expand(range[0],range[1]) : expandDiagonally(range[0],range[1]);
var inBoth = (array1:number[][], array2:number[][]) : number[][] => array1.filter(el => h.contains(array2, el));

console.time("day 5");
var vents = h.read(5,'vents.txt').map((v:string) => v.trim().split(/\s+->\s+/).map((co:string) => co.split(',').toInt()));

// part 1/2
var part = 2;
var expandedVents = vents.map(v => superExpand(v));
var hvIndices = vents.range().filter(i => isHorVert(vents[i]));
if (part == 1) {
    vents = hvIndices.map(i => vents[i]);
    expandedVents = hvIndices.map(i => expandedVents[i]);
}
var dangerousVents: number[][] = [];
for (const i of vents.range(1)) {
    for (const j of h.rangee(0,i)) if (possibleOverlap(vents[i],vents[j])) dangerousVents = dangerousVents.concat(inBoth(expandedVents[i], expandedVents[j]));
    if ((i%Math.floor(vents.length/10)) == 0) h.print((i/vents.length*100).toPrecision(2),'% done');
}
var uniqueDangerous = h.uniqueArray(dangerousVents);
h.print('part ',part,' => unique dangerous vents: ',uniqueDangerous.length);
console.timeEnd("day 5");