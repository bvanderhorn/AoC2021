import * as h from '../helpers';
var overlap = (cuboid1:number[][], cuboid2:number[][]) : boolean => !cuboid1.map((r,i) => h.overlaps(r,cuboid2[i])).includes(false);
var excludedCuboids = (cuboidCheck: number[][], cuboidFixed:number[][]) : number[][][] => {
    if (!overlap(cuboidCheck, cuboidFixed)) return [cuboidCheck];
    
    // if cuboids overlap, return the sub-cuboids from cuboidCheck that are not in cuboidFixed
    let newRanges : number[][][] = [];
    var crange = cuboidCheck.copy();
    for (let i=0; i<cuboidCheck.length; i++) {
        let r = cuboidCheck[i];
        let f = cuboidFixed[i];
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


var input = h.read(22,'cubes.txt');
var cuboids: number[][][] = input.split(',').split('..').mape(x => x.replace(/[\s\S]*=/,'')).tonum();
var onOff: boolean[]  = input.map(x => x.startsWith('on'));
h.print(cuboids.slice(0,3));
h.print(onOff.slice(0,3));

var c1 = [[0,2],[0,2],[0,2]];
var c2 = [[1,1],[1,1],[1,1]];
h.print(excludedCuboids(c1,c2));


