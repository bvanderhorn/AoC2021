import * as h from '../helpers';
var overlap = (cuboid1:number[][], cuboid2:number[][]) : boolean => !cuboid1.map((r,i) => h.overlaps(r,cuboid2[i])).includes(false);
var leftDiff = (cuboidLeft: number[][], cuboidRight:number[][]) : number[][][] => {
    if (!overlap(cuboidLeft, cuboidRight)) return [cuboidLeft];
    
    // if cuboids overlap, return the sub-cuboids from cuboidLeft that are not in cuboidRight
    let newRanges : number[][][] = [];
    var crange = cuboidLeft.copy();
    for (let i=0; i<cuboidLeft.length; i++) {
        let r = cuboidLeft[i];
        let f = cuboidRight[i];
        if (f[0] <= r[0] && f[1] >= r[1]) continue;
        if (f[0] > r[0]) {
            let c = crange.copy();
            c[i] = [r[0],f[0]-1];
            newRanges.push(c);
            crange[i] = [f[0],crange[i][1]];
        }
        if (f[1] < r[1]) {
            let c = crange.copy();
            c[i] = [f[1]+1,r[1]];
            newRanges.push(c);
            crange[i] = [crange[i][0],f[1]];
        }               
    }

    return newRanges;
}
var notInSet = (cuboid:number[][], cuboids:number[][][]) : number[][][] => {
    let out = [cuboid];
    for (let c of cuboids) {
        let newOut = [];
        for (let o of out) {
            newOut.push(...leftDiff(o,c));
        }
        out = newOut;
    }
    return out;
}
var intersection = (cuboid1:number[][], cuboid2:number[][]) : number[][] => {
    if (!overlap(cuboid1, cuboid2)) return [];
    let out = cuboid1.copy();
    for (let i=0; i<cuboid1.length; i++) {
        let r = cuboid1[i];
        let f = cuboid2[i];
        out[i] = [Math.max(r[0],f[0]), Math.min(r[1],f[1])];
    }
    return out;
}
var countCoords = (cuboid:number[][]) : number => cuboid.map(r => r[1]-r[0]+1).prod();
var countCoordsInSet = (cuboids:number[][][]) : number => cuboids.map(c => countCoords(c)).sum();

var input = h.read(22,'cubes.txt');
var cuboids: number[][][] = input.split(',').split('..').mape(x => x.replace(/[\s\S]*=/,'')).tonum();
var onOff: boolean[]  = input.map(x => x.startsWith('on'));
var extCuboids: [boolean, number[][]][] = cuboids.map((c,i) => [onOff[i],c]);
extCuboids = extCuboids.reverse();
h.print(extCuboids.map(x => JSON.stringify(x)));

// part 1
// get intersection of cuboids with region-of-interest
var roi = [[-50,50],[-50,50],[-50,50]];
var cuboidsInRoi: [boolean, number[][]][] = extCuboids.filter(c => overlap(c[1],roi)).map(c => [c[0], intersection(c[1],roi)]);
h.print(cuboidsInRoi.map(x => JSON.stringify(x)));

// get sets of true and false cuboids within region-of-interest
var trueCuboids: number[][][] = [];
var falseCuboids: number[][][] = [];
for (let i=0; i<cuboidsInRoi.length; i++) {
    let c = cuboidsInRoi[i];
    let newCuboids = notInSet(c[1],cuboidsInRoi.slice(0,i).map(x => x[1]));
    if (c[0]) trueCuboids.push(...newCuboids);
    else falseCuboids.push(...newCuboids);
}

h.print(countCoordsInSet(trueCuboids));
