import * as h from "../helpers";
var allEqual = (array:number[]) : boolean => array.slice(1).map(el => el === array[0] ? 1 : 0).sum() == (array.length -1);
var direction = (range: number[][]) : number => (range[0][0] == range[1][0]) ? 1 : 0;
var sameDirection = (range1:number[][], range2:number[][]) : number => {
    if((direction(range1) == 0) && (direction(range2) == 0)) return 0;
    if ((direction(range1) == 1) && (direction(range2) == 1)) return 1;
    return -1;
}
var align = (range1:number[][], range2:number[][]) : number => {
    if(allEqual([range1[0][0],range1[1][0],range2[0][0],range2[1][0]])) return 0;
    if (allEqual([range1[0][1],range1[1][1],range2[0][1],range2[1][1]])) return 1;
    return -1;
}
var overlap = (range1:number[][], range2:number[][]) : boolean => {
    var al = align(range1, range2);
    if (al == -1) return false;
    return h.overlaps([range1[0][1-al],range1[1][1-al]].sort((a,b) => a-b),[range2[0][1-al],range2[1][1-al]].sort((a,b) => a-b));
}
var cross = (range1:number[][], range2:number[][]) : boolean => {
    if (sameDirection(range1, range2) >= 0) return false;
    var xMin1 = Math.min(range1[0][0],range1[1][0]);
    var xMax1 = Math.max(range1[0][0],range1[1][0]);
    var yMin1 = Math.min(range1[0][1],range1[1][1]);
    var yMax1 = Math.max(range1[0][1],range1[1][1]);
    var xMin2 = Math.min(range2[0][0],range2[1][0]);
    var xMax2 = Math.max(range2[0][0],range2[1][0]);
    var yMin2 = Math.min(range2[0][1],range2[1][1]);
    var yMax2 = Math.max(range2[0][1],range2[1][1]);
    if (direction(range1) == 0) return (xMin1 <= xMin2) && (xMax1 >= xMin2) && (yMin2 <= yMin1) && (yMax2 >= yMin1);
    else return (yMin1 <= yMin2) && (yMax1 >= yMin2) && (xMin2 <= xMin1) && (xMax2 >= xMin1);
}
var inBoth = (array1:number[][], array2:number[][]) : number[][] => h.uniqueArray(array1).filter(el => h.contains(array2, el));
var vents = h.read(5,'vents.txt').map(v => v.trim().split(/\s+->\s+/).map((co:string) => co.split(',').toInt()));

// part 1
var vents1 = vents.filter(v => (v[0][0] == v[1][0]) || (v[0][1] == v[1][1]));
var dangerousVents: number[][] = [];
for (const i of vents1.range(1)) {
    var current = vents1[i];
    for (const j of vents1.slice(0,i)) {
        if (overlap(current, j) || cross(current, j)) dangerousVents.push(...inBoth(h.expand(current[0],current[1]), h.expand(j[0],j[1])));
    }
}
var uniqueDangerous = h.uniqueArray(dangerousVents);
h.print('part 1 => unique dangerous vents: ',uniqueDangerous.length);