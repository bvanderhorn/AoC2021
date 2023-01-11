import * as h from "../helpers";
var distance = (b1: number[], b2:number[]) : number => Math.sqrt(Math.pow(b1[0]-b2[0],2) + Math.pow(b1[1] -b2[1],2) + Math.pow(b1[2]-b2[2],2));
var dists = (scanner:number[][]) : number[][] => scanner.map(s1 => scanner.map(s2 => distance(s1,s2)));
var distcomparison = (dist1: number[][], dist2:number[][]) : number[][] => dist1.map(d1 => dist2.map(d2 => d2.shared(d1).length));
var potentialcount = (dist1: number[][], dist2:number[][]) : number => distcomparison(dist1, dist2).map(d => d.max()).map(c => c>=12 ? 1 : 0).sum();
console.time("day 19");
var scanners = h.read(19,'scanners.txt').subfilter(l => !l.includes('scanner')).split(',').tonum();
var distances: number[][][] = scanners.map(s => dists(s));
var shared01 = distances[0].map(d0 => distances[9].map(d1 => d1.shared(d0).length)).printcolor(x => x>=12,'r',',');
h.print(shared01);
h.print(distances.map((d,i) => [i,potentialcount(distances[0],d)]).printcolor(x => x>=12,'r',','));
// h.print(scanners.map(s => s.length));
console.timeEnd("day 19");