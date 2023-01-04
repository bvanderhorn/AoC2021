import * as fs from "fs";

const sourceFolder = '../../src/';
const exampleString = 'example_';

export {}
declare global {
    interface Array<T>  {
        sum(): number;
        sum0(): number[];
        sum1(): number[];
        multiply(): number;
    }
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
            return this[0].map((el:number,i:number) => el + this.slice(1).map(c => c[i]).sum());
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
            return this.map(el => el.sum());
        }
    });
}

if (!Array.prototype.multiply) {
    // multiplication of all array elements
    Object.defineProperty(Array.prototype, 'multiply', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function multiply(this: number[]): number {
            return this.reduce((a:number,b:number) => a*b);
        }
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

export function uniqueArray(array: number[][]) {
    // from https://stackoverflow.com/a/66420296/1716283
    return Array.from(
        new Map(array.map((p) => [JSON.stringify(p), p])).values()
      )
}

export function isDivisible(num:number, div:number){
    return num/div === Math.floor(num/div);
}

export function contains(array: any[][], element: any[]): boolean {
    return array.filter(el => {
        if (el.length != element.length) return false;
        for (let i=0;i<el.length;i++) if (el[i] !== element[i]) return false;
        return true;
    }).length >= 1;
}

export function overlaps(interval1:number[], interval2:number[]) : boolean {
    return interval1[0]<=interval2[1] && interval1[1]>=interval2[0]; 
}