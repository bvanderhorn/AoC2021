import * as h from "../helpers";
var distance = (b1: number[], b2:number[]) : number => Math.sqrt(Math.pow(b1[0]-b2[0],2) + Math.pow(b1[1] -b2[1],2) + Math.pow(b1[2]-b2[2],2));
var dists = (scanner:number[][]) : number[][] => scanner.map(s1 => scanner.map(s2 => distance(s1,s2)));
var distcomparison = (dist1: number[][], dist2:number[][]) : number[][] => dist1.map(d1 => dist2.map(d2 => d2.shared(d1).length));
var potentialcount = (comparison:number[][]) : number => comparison.map(d => d.max()).map(c => c>=10 ? 1 : 0).sum();
var matchingscanners = (comparisons: number[][][], scannerIndex:number) : number[] => 
    comparisons.map(dc => potentialcount(dc)).map((c,i) => c>= 12 ? i : -1).filter(i => i >=0 && i !== scannerIndex);
var pointmatch = (comparison: number[][]) : number[][] => comparison.map((c,i) => [i, c.findIndex(x => x>=12)]).filter(pp => pp[1]>=0);
var pointpairs = (scanners:number[][][], pointmatches: [number[], number[][]][], s1:number, s2:number): number[][][] => {
    let pointmatch : [number[], number[][]] = pointmatches[pointmatches.findIndex(pm => h.equals2(pm[0],[s1, s2]))]
    return pointmatch[1].map(pp => [scanners[s1][pp[0]], scanners[s2][pp[1]]]);
}
var flips8: string[] = ['+++','++-','+-+','+--','-++','-+-','--+','--'];
var permutations6 : number[][] = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
var rotations48 : [string, number[]][] = flips8.map(f => permutations6.map(p => [f, p])).flat();
var applyRotation = (point:number[], rotation: [string, number[]]) : number[] => {
    let pnew : number[] = [];
    for (const i of point.range()) pnew.push((rotation[0][i] === '-' ?-1:1)*point[rotation[1][i]]);
    return pnew;
}
var applyTranslation = (point:number[], translation:number[]) : number[] => [point,translation].sum0();
var getTransform = (b1: number[], b2:number[], rotation: [string, number[]]) : [[string, number[]],number[]] => {
    // find transform to map b2 to b1 when applying given rotation to b2 coordinates
    let b2new = applyRotation(b2, rotation);
    let translation : number[] = [b1[0]-b2new[0], b1[1]-b2new[1], b1[2]-b2new[2]];
    return [rotation, translation];
}
var getAllTransforms = (b1:number[], b2: number[]) : [[string, number[]],number[]][] => rotations48.map(r => getTransform(b1,b2,r));
var applyTransform = (point:number[], transform:[[string, number[]],number[]]) : number[] => applyTranslation(applyRotation(point, transform[0]),transform[1]);
var checkTransform = (b1:number[], b2:number[], transform:[[string, number[]],number[]]) : boolean => {
    // check if applying transform to b2 gives b1
    return h.equals2(b1, applyTransform(b2, transform));
}

console.time("day 19");
var scanners = h.read(19,'scanners.txt').subfilter(l => !l.includes('scanner')).split(',').tonum();
var distances: number[][][] = scanners.map(s => dists(s));
var dcs : number[][][][] = distances.map(d1 => distances.map(d2 => distcomparison(d1,d2)));
var matching: number[][] = dcs.map((dc,i)=> matchingscanners(dc,i));
var pointmatches: [number[], number[][]][] = matching.map((l,i)=> l.map(m => [[i,m],pointmatch(dcs[i][m])])).flat().filter(pm => pm[0] < pm[1]);

// part 1 try 2: do actual mapping of all points
var pp09 = pointpairs(scanners,pointmatches,0,9);
var transforms09 = getAllTransforms(pp09[0][0],pp09[0][1]);
h.write(19,'transforms09.json',h.stringify(transforms09));
var tcheck = transforms09.map(t => checkTransform(pp09[0][0],pp09[0][1],t));
h.print(tcheck);

// h.print(rotations48.slice(0,3));
var rot: [string, number[]] = ['+--',[2,0,1]];
var tr = getTransform([1,2,3], [4,5,6],rot);
h.print(tr);
h.print(applyTransform([4,5,6],tr));
// h.print()

// showing some stuff
// h.print(dcs[0][9].printcolor(x => x>=12,'r',','));
// h.print(pointmatch(dcs[0][9]));
h.print(matching);
h.print(pp09);
h.write(19,'pointmatches.json',h.stringify(pointmatches));

console.timeEnd("day 19");