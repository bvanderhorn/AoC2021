import * as h from "../helpers";
type Scanner= number[][];
type PointMatch = [number[], number[][]];
type Transform = [[string, number[]],number[]];

var distance = (b1: number[], b2:number[]) : number => Math.sqrt(Math.pow(b1[0]-b2[0],2) + Math.pow(b1[1] -b2[1],2) + Math.pow(b1[2]-b2[2],2));
var dists = (scanner: Scanner) : number[][] => scanner.map(s1 => scanner.map(s2 => distance(s1,s2)));
var distcomparison = (dist1: number[][], dist2:number[][]) : number[][] => dist1.map(d1 => dist2.map(d2 => d2.shared(d1).length));
var potentialcount = (comparison:number[][]) : number => comparison.map(d => d.max()).map(c => c>=10 ? 1 : 0).sum();
var matchingscanners = (comparisons: number[][][], scannerIndex:number) : number[] => 
    comparisons.map(dc => potentialcount(dc)).map((c,i) => c>= 12 ? i : -1).filter(i => i >=0 && i !== scannerIndex);
var pointmatch = (comparison: number[][]) : number[][] => comparison.map((c,i) => [i, c.findIndex(x => x>=12)]).filter(pp => pp[1]>=0);
var pointpairs = (scanners:Scanner[], pointmatches: PointMatch[], s1:number, s2:number): number[][][] => {
    let pointmatch : PointMatch = pointmatches[pointmatches.findIndex(pm => h.equals2(pm[0],[s1, s2]))]
    return pointmatch[1].map(pp => [scanners[s1][pp[0]], scanners[s2][pp[1]]]);
}
var flips8: string[] = ['+++','++-','+-+','+--','-++','-+-','--+','---'];
var permutations6 : number[][] = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
var rotationsPerFlip = (flip:string, permutations: number[][]) : [string, number[]][] => permutations.map(p => [flip, p]);
var rotations48 : [string, number[]][] = flips8.map(f => rotationsPerFlip(f, permutations6)).flat();
var applyRotation = (point:number[], rotation: [string, number[]]) : number[] => {
    let pnew : number[] = [];
    for (const i of point.range()) pnew.push((rotation[0][i] === '-' ?-1:1)*point[rotation[1][i]]);
    return pnew;
}
var scannerMatches = (scanner:number, matchingScanners:number[], distComparisons: number[][][][]) : PointMatch[] => {
    return matchingScanners.map(m => [[scanner, m], pointmatch(distComparisons[scanner][m])]);
}
var applyTranslation = (point:number[], translation:number[]) : number[] => [point,translation].sum0();
var getTransform = (b1: number[], b2:number[], rotation: [string, number[]]) : Transform => {
    // find transform to map b2 to b1 when applying given rotation to b2 coordinates
    let b2new = applyRotation(b2, rotation);
    let translation : number[] = [b1[0]-b2new[0], b1[1]-b2new[1], b1[2]-b2new[2]];
    return [rotation, translation];
}
var getAllTransforms = (b1:number[], b2: number[]) : Transform[] => rotations48.map(r => getTransform(b1,b2,r));
var applyTransform = (point:number[], transform:[[string, number[]],number[]]) : number[] => applyTranslation(applyRotation(point, transform[0]),transform[1]);
var checkTransform = (b1:number[], b2:number[], transform:Transform) : boolean => {
    // check if applying transform to b2 gives b1
    return h.equals2(b1, applyTransform(b2, transform));
}
var findTransform = (scanners: Scanner[], pointmatches: PointMatch[], s1:number, s2:number) : Transform => {
    let pps = pointpairs(scanners,pointmatches,s1,s2);
    let tfs = getAllTransforms(pps[0][0],pps[0][1]);
    for(const pp of pps) { 
        tfs = tfs.filter(t => checkTransform(pp[0],pp[1], t));
        if (tfs.length === 1) break;
    }
    if (tfs.length > 1)   h.print(' >> ERROR: found more than one valid transform for scanner pair ',s1, ', ',s2, ' <<');
    if (tfs.length === 0) h.print(' >> ERROR: found NO valid transform for scanner pair ',s1, ', ',s2, ' <<');
    return tfs[0];
}
var mergeScanners = ( transform:Transform, s1:Scanner, s2:Scanner) : Scanner => s1.concat(s2.map(p => applyTransform(p,transform))).unique();
var getChildren = (transforms:[number[], Transform][], scanner:number) : [number[], Transform][] => transforms.filter(tf => tf[0][0] === scanner);

var alreadyMerged : number[] = [0];
var mergeWithAllChildren = (scanners: Scanner[], transforms: [number[], Transform][], scanner:number) : Scanner => {
    let mergedScanner = scanners[scanner].map(s => s);
    let children = getChildren(transforms, scanner);
    for (const c of children) {
        if (alreadyMerged.includes(c[0][1])) continue;
        alreadyMerged.push(c[0][1]);
        let child = mergeWithAllChildren(scanners, transforms, c[0][1]);
        h.print(' merging ',c[0][1],' into ',c[0][0]);
        mergedScanner = mergeScanners(c[1],mergedScanner,child);
    }
    return mergedScanner;
}

console.time("day 19");
var scanners = h.read(19,'scanners.txt').subfilter(l => !l.includes('scanner')).split(',').tonum();
var distances: number[][][] = scanners.map(s => dists(s));
var dcs : number[][][][] = distances.map(d1 => distances.map(d2 => distcomparison(d1,d2)));
var matching: number[][] = dcs.map((dc,i)=> matchingscanners(dc,i));
var pointmatches: PointMatch[] = matching.map((l,i)=>  scannerMatches(i,l,dcs)).flat();
var transforms: [number[], Transform][] = pointmatches.map(pm => [pm[0], findTransform(scanners, pointmatches,pm[0][0],pm[0][1])]);

// part 1: do actual mapping of all points
let mergedScanner = mergeWithAllChildren(scanners, transforms,0);
h.print('part 1: total number of points: ',mergedScanner.length);
h.write(19,'mergedscanner.json',h.stringify(mergedScanner));

console.timeEnd("day 19");