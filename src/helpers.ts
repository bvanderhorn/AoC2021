import * as fs from "fs";

const sourceFolder = '../../src/';
const exampleString = 'example_';

export {}
declare global {
    interface Array<T>  {
        sum(): number;
        multiply(): number;
    }
}

if (!Array.prototype.sum) {
    Object.defineProperty(Array.prototype, 'sum', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum(this: number[]): number {
        return this.reduce((a:number,b:number) => a+b);
        }
    });
}

if (!Array.prototype.multiply) {
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