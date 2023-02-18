import * as h from '../helpers';
var inRange = (x:number, range:number[]) : boolean => x>= range[0] && x<=range[1];
var excludedCuboids = (cuboidCheck: number[][], cuboidFixed:number[][]) : number[][][] => {
    // if any of the ranges don't overlap, return the original cuboid
    let ol = cuboidCheck.map((r,i) => h.overlaps(r,cuboidFixed[i]));
    if (ol.includes(false)) return [cuboidCheck];
    
    // if all ranges overlap, return the excluding cuboids
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

var input = h.read(22,'cubes.txt').split(',').split('..').mape(x => x.replace(/[\s\S]*=/,'')).tonum();
h.print(input.slice(0,3));

var c1 = [[0,2],[0,2],[0,2]];
var c2 = [[1,1],[1,1],[1,1]];
h.print(excludedCuboids(c1,c2));


