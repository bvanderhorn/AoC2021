import * as fs from "fs";

const sourceFolder = '../../src/';

export function stringify(object: any) : string {
    return JSON.stringify(object, null, 4);
}

export function writeFile(day:number, filename:string,content:string, example:boolean = false) {
    const exampleString = 'example';
    fs.writeFileSync(sourceFolder + day.toString() + '/' + ((!example) ? exampleString + '_' : '') + filename,content);
}

export function readInput(day:number,filename:string) : any[] {
    const input = fs.readFileSync(sourceFolder + day.toString() + '/' + filename, 'utf8').split('\r\n\r\n').map(el => el.split('\r\n'));
    return (input.length == 1) ? input[0] : input;
}

export function print(input:any) {
    console.log(input);
}