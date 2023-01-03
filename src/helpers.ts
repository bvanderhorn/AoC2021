import * as fs from "fs";

const sourceFolder = '../../src/';
const exampleString = 'example_';

export function stringify(object: any) : string {
    return JSON.stringify(object, null, 4);
}

export function write(day:number, filename:string,content:string, options:string='') {
    // options
    const example: boolean = options.includes('ex');

    const fn = (example ? exampleString : '') + filename;
    print(' writing to file: '+fn)
    fs.writeFileSync(sourceFolder + day.toString() + '/' + fn,content);
}

export function read(day:number,filename:string, options:string='') : any[] {
    // options
    const example: boolean = options.includes('ex');
    const toInt: boolean = options.includes('toint');

    const fn = (example ? exampleString : '') + filename;
    print(' reading file: '+fn)
    const input = fs.readFileSync(sourceFolder + day.toString() + '/' + fn, 'utf8').split('\r\n\r\n').map(el => el.split('\r\n').map(i => toInt ? +i : i));
    return (input.length == 1) ? input[0] : input;
}

export function print(input:any) {
    console.log(input);
}