import * as h from "../helpers";
var distance = (b1: number[], b2:number[]) : number => Math.sqrt(Math.pow(b1[0]-b2[0],2) + Math.pow(b1[1] -b2[1],2) + Math.pow(b1[2]-b2[2],2));
var dists = (scanner:number[][]) : number[][] => scanner.map(s1 => scanner.map(s2 => distance(s1,s2)));
var distcomparison = (dist1: number[][], dist2:number[][]) : number[][] => dist1.map(d1 => dist2.map(d2 => d2.shared(d1).length));
var potentialcount = (comparison:number[][]) : number => comparison.map(d => d.max()).map(c => c>=12 ? 1 : 0).sum();
var matchingscanners = (comparisons: number[][][], scannerIndex:number) : number[] => 
    comparisons.map(dc => potentialcount(dc)).map((c,i) => c>= 12 ? i : -1).filter(i => i >=0 && i !== scannerIndex);
var pointmatch = (comparison: number[][]) : number[][] => comparison.map((c,i) => [i, c.findIndex(x => x>=12)]).filter(pp => pp[1]>=0);
var sharedwithearlier = (pointmatch: [number, number[][]][], index: number) : number => pointmatch.filter(pm => pm[0] < index).map(pm => pm[1].col(0)).flat().unique().length;

console.time("day 19");
var scanners = h.read(19,'scanners.txt').subfilter(l => !l.includes('scanner')).split(',').tonum();
var distances: number[][][] = scanners.map(s => dists(s));
var dcs : number[][][][] = distances.map(d1 => distances.map(d2 => distcomparison(d1,d2)));
var matching: number[][] = dcs.map((dc,i)=> matchingscanners(dc,i));
var pointmatches: [number, number[][]][][] = matching.map((l,i)=> l.map(m => [m,pointmatch(dcs[i][m])]));
var pmshared = pointmatches.map((pm,i) => sharedwithearlier(pm,i));
var tp = scanners.map(s => s.length).sum();
var uniquepoints : number = tp - pointmatches.map((pm,i) => sharedwithearlier(pm,i)).sum();

// showing some stuff
var pm09 : [number, number[][]]= pointmatches[0][0];
var pointpairs09 = pm09[1].map(pp => [scanners[0][pp[0]], scanners[pm09[0]][pp[1]]]);
// h.print(scanners.map(s => s.length));
h.print(dcs[0][9].printcolor(x => x>=12,'r',','));
h.print(pointmatch(dcs[0][9]));
h.print(matching);
h.print(pointpairs09);

var pmtest = pointmatches[10];
h.print(pmtest.map(l => JSON.stringify(l) ));

h.write(19,'pointmatches.json',h.stringify(pointmatches));

h.print();
h.print('part 1: total points detected: ', tp,', shared points: ', pmshared.sum(), ', total unique: ',tp - pmshared.sum());
console.timeEnd("day 19");