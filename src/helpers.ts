import * as fs from "fs";

const sourceFolder = '../../src/';
const exampleString = 'example_';

export {}
declare global {
    interface Array<T>  {
        sum(): number;
        prod(): number;
        sum0(): number[];
        sum1(): number[];
        prod0(): number[];
        prod1(): number[];
        toInt(): number[];
        sortInt(): number[];
        range(start:number): number[];
        range(): number[];
        col(column:number): any[];
        times(t: number) : number[];
        plus(p:number) : number[];
        count(element:any): number;
        includesAll(array: any[]) : boolean;
        last(): any;
        min(): number;
        max(): number;
    }
}

if (!Array.prototype.toInt) {
    // cast all elements to int
    Object.defineProperty(Array.prototype, 'toInt', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function toInt(this: string[]): number[] {
            return this.map(str => +str);
        }
    });
}

if (!Array.prototype.sortInt) {
    // sort number array ascending
    Object.defineProperty(Array.prototype, 'sortInt', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sortInt(this: number[]): number[] {
            return this.sort((a,b) => a-b);
        }
    });
}

if (!Array.prototype.min) {
    // minimum of all array elements
    Object.defineProperty(Array.prototype, 'min', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function min(this: number[]): number {
            return Math.min(...this);
        }
    });
}

if (!Array.prototype.max) {
    // maximum of all array elements
    Object.defineProperty(Array.prototype, 'max', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function max(this: number[]): number {
            return Math.max(...this);
        }
    });
}

if (!Array.prototype.col) {
    // column of array with sub arrays at given X position
    Object.defineProperty(Array.prototype, 'col', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function col(this: any[][], column:number): any[] {
            return this.map(el => el[column]);
        }
    });
}

if (!Array.prototype.times) {
    // multiply each element with a scalar value
    Object.defineProperty(Array.prototype, 'times', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function times(this: number[], t:number): number[] {
            return this.map(el => el * t);
        }
    });
}

if (!Array.prototype.plus) {
    // add a scalar value to each element
    Object.defineProperty(Array.prototype, 'plus', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function plus(this: number[], p:number): number[] {
            return this.map(el => el + p);
        }
    });
}

if (!Array.prototype.count) {
    // count of all occurrences of element in array
    Object.defineProperty(Array.prototype, 'count', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function count(this: any[], element:any): number {
            return this.reduce(function(n, val) {
                return n + (val === element);
            }, 0);
        }
    });
}

if (!Array.prototype.includesAll) {
    // check if array includes all elements of second array
    Object.defineProperty(Array.prototype, 'includesAll', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function includesAll(this: any[], array:any[]): boolean {
            return array.every(v => this.includes(v));
        }
    });
}

if (!Array.prototype.range) {
    Object.defineProperty(Array.prototype, 'range', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function range(this: any[],start:number = 0): number[] {
            return rangee(start, this.length);
        }
    });
}

if (!Array.prototype.last) {
    // last element of array
    Object.defineProperty(Array.prototype, 'last', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function last(this: any[]): any {
            return this[this.length -1];
        }
    });
}

if (!Array.prototype.sum) {
    // sum of all array elements
    Object.defineProperty(Array.prototype, 'sum', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum(this: number[]): number {
            return this.reduce((a:number,b:number) => a+b, 0);
        }
    });
}

if (!Array.prototype.sum0) {
    // piece-wise sum of sub-array elements in primary (Y) direction
    Object.defineProperty(Array.prototype, 'sum0', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum0(this:number[][] ): number[] {
            return apply0(this, 'sum');
        }
    });
}

if (!Array.prototype.prod0) {
    // piece-wise product of sub-array elements in primary (Y) direction
    Object.defineProperty(Array.prototype, 'prod0', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod0(this:number[][] ): number[] {
            return apply0(this, 'prod');
        }
    });
}

if (!Array.prototype.prod1) {
    // products of all elements within each sub-array (in secondary (X) direction)
    Object.defineProperty(Array.prototype, 'prod1', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod1(this:number[][] ): number[] {
            return apply1(this, 'prod');
        }
    });
}

if (!Array.prototype.sum1) {
    // sum of elements of each sub-array (i.e., sum in secondary (X) direction)
    Object.defineProperty(Array.prototype, 'sum1', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum1(this: number[][]): number[] {
            return apply1(this, 'sum');
        }
    });
}

if (!Array.prototype.prod) {
    // multiplication of all array elements
    Object.defineProperty(Array.prototype, 'prod', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod(this: number[]): number {
            return this.reduce((a:number,b:number) => a*b);
        }
    });
}

export function apply0(array: number[][],operation:string) : number[] {
    return array[0].map((el:number,i:number) => {
        let verticalSlice = array.slice(1).map(c => c[i]);
        if (operation === 'sum') return el + verticalSlice.sum();
        else return el * verticalSlice.prod();
    });
}

export function apply1(array: number[][], operation:string) : number[] {
    return array.map(el => {
        if (operation == 'sum') return el.sum();
        else return el.prod();
    });
}

export function stringify(object: any) : string {
    return JSON.stringify(object, null, 4);
}

export function write(day:number, filename:string,content:string, options:string='') {
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
    // options
    const toInt: boolean = options.includes('toint');
    
    const input = simpleRead(day,filename,options).split('\r\n\r\n').map(el => el.split('\r\n').map(i => toInt ? +i : i));
    return (input.length == 1) ? input[0] : input;
}

export function print(...input:any[]) {
    console.log(...input);
}

export function equals(first: any[], second: any[]) : boolean {
    return JSON.stringify(first) === JSON.stringify(second);
}

export function equals2(first: any[], second: any[]): boolean {
    if (first.length != second.length) return false;
    for (let i=0;i<first.length;i++) if (first[i] !== second[i]) return false;
    return true;
}

export function contains(array: any[][], element: any[]): boolean {
    return array.filter(el => equals2(el, element)).length >= 1;
}

export function uniqueSimple(array: any[]) : any[] {
    return [...new Set(array)];
}

export function uniqueArray(array: number[][]) {
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

export function rangee(start:number, end:number) : number[] {
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