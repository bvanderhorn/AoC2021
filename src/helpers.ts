import * as fs from "fs";
export * from "./ArrayExtensions";

const sourceFolder = '../../src/';
const exampleString = 'example_';

export function stringify(object: any) : string {
    return JSON.stringify(object, null, 4);
}

export function write(day:number, filename:string, content:string, options:string='') {
    // options
    const example: boolean = options.includes('ex');

    const fn = (example ? exampleString : '') + filename;
    print(' writing to file: ',day,'/',fn)
    fs.writeFileSync(sourceFolder + day + '/' + fn,content);
}

export function simpleRead(day:number, filename:string, options:string ='') : string {
    // options
    const example: boolean = options.includes('ex');

    const fn = (example ? exampleString : '') + filename;
    print(' reading file: ',day,'/', fn);
    return fs.readFileSync(sourceFolder + day + '/' + fn, 'utf8');
}

export function read(day:number,filename:string, options:string='') : any[] {
    // read a file, split on double enters, then split on single enters
    // if double enters: returns string[][]
    // if no double enters: returns string[]
    const input = simpleRead(day,filename,options).split(/\r?\n\r?\n/).map(el => el.split(/\r?\n/));
    return input.length == 1 ?  input[0] : input;
}

export function print(...input:any[]) {
    console.log(...input);
}

export function equals(first: any[], second: any[]) : boolean {
    return JSON.stringify(first) === JSON.stringify(second);
}

export function uniqueSimple(array: any[]) : any[] {
    return [...new Set(array)];
}

export function uniquea(array: number[][]) {
    // from https://stackoverflow.com/a/66420296/1716283
    return Array.from(
        new Map(array.map((p) => [JSON.stringify(p), p])).values()
    )
}

export function isDivisible(num:number, div:number){
    return num/div === Math.floor(num/div);
}

export function overlaps(interval1:number[], interval2:number[]) : boolean {
    return interval1[0]<=interval2[1] && interval1[1]>=interval2[0]; 
}

export function range(start:number, end:number) : number[] {
    return Array.from({length: (end - start)}, (v, k) => k + start);
}

export function expand(coor1: number[], coor2: number[]) : number[][] {
    var varIndex = (coor1[0] === coor2[0]) ? 1 : 0;
    var start = Math.min(coor1[varIndex], coor2[varIndex]);
    var end = Math.max(coor1[varIndex], coor2[varIndex]);
    var varIndices = Array(end-start+1).fill(1).map((_, index) => start + index);
    var expanded = (coor1[0] === coor2[0]) ? varIndices.map(el => [coor1[0], el]) : varIndices.map(el => [el, coor1[1]]);
    return start === coor1[varIndex] ? expanded : expanded.reverse();
}
export function expandTrace(trace:number[][]) : number[][] {
    var expTrace : number[][] = [trace[0]];
    for (let i=1;i<trace.length;i++) expTrace = expTrace.concat(expand(trace[i-1],trace[i]).slice(1));
    return expTrace;
}

export function getnb(pos:number[], dyi:number[]|number = 0, dxi:number[]|number = 0,options=''): number[][] {
    // with Y being the primary (down) direction of the 2D map, and X being the secondary (right) one
    // dx, dy are in format [xMin, xMax] / [yMin, yMax]
    var dx = Array.isArray(dxi) ? dxi : [0,dxi];
    var dy = Array.isArray(dyi) ? dyi : [0,dyi];
    var n8 = options.includes('8');
    var n9 = options.includes('9');
    var noFilter = options.includes('nf');
    var filterDirs = options.includes('u') || options.includes('d') || options.includes('l') || options.includes('r');
    var dirs = 'udlr'.split('');
    if (filterDirs) dirs = dirs.filter(d => options.includes(d));

    var nb:number[][] = [];
    if (dirs.includes('u')) nb.push([pos[0]-1, pos[1]]);
    if (dirs.includes('d')) nb.push([pos[0]+1, pos[1]]);
    if (dirs.includes('l')) nb.push([pos[0]  , pos[1]-1]);
    if (dirs.includes('r')) nb.push([pos[0]  , pos[1]+1]);
    if (n8 || n9) nb.push(
        [pos[0]-1, pos[1]-1],
        [pos[0]-1, pos[1]+1],
        [pos[0]+1, pos[1]-1],
        [pos[0]+1, pos[1]+1]
    );
    if (n9) nb.push(pos);
    if (!noFilter) nb = nb.filter(n => n[0] >= dy[0] && n[0]<=dy[1] && n[1]>=dx[0] && n[1]<=dx[1]);

    return nb;
}

export function ea(len:number|number[],fill:any = undefined) : any[] {
        if (Array.isArray(len) && len.length > 1) return ea(len[0]).map(_ => ea(len.slice(1),fill));
        if (Array.isArray(len)) return ea(len[0],fill);
        return new Array(len).fill(fill);
}

export function progress(counter:number,total:number, intervals:number = 100) {
  if (counter % Math.floor(total/intervals) === 0) print((counter/total*100).toPrecision(3),'% done');
}