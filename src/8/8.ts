import * as h from "../helpers";
var dgot = (display:string[][], contains: number) : boolean => display.flat().map(s => s.length == contains ? 1 : 0).sum() > 0;
var get14 = (display:string[][]) : string[] => [display.flat().filter(d => d.length === 2)[0], display.flat().filter(d => d.length === 4)[0]];
var translate = (str:string, ex1:string, ex4: string) : string => {
    if (str.length == 2) return "1";
    if (str.length == 4) return "4";
    if (str.length == 3) return "7";
    if (str.length == 7) return "8";
    var sharedWith1 = h.range(0,ex1.length).map(i => str.includes(ex1[i]) ? 1 : 0).sum();
    var sharedWith4 = h.range(0,ex4.length).map(i => str.includes(ex4[i]) ? 1 : 0).sum();
    if (str.length == 6) {
        if (sharedWith1 == 1) return "6"; 
        if (sharedWith4 == 4) return "9"; 
        return "0";
    } 
    if (str.length == 5) {
        if (sharedWith1 == 2) return "3"; 
        if (sharedWith4 == 2) return "2"; 
    }
    return "5";
}
var translateDisplay = (display:string[][]) : string[][] => display.map(l => l.map(str => translate(str,get14(display)[0],get14(display)[1])));
var displays = h.read(8,'displays.txt').map(d => d.split(/\s+\|\s+/).map((l:string)=> l.split(' ')));
var outputs = displays.map(d => d[1]);
h.print('part 1: 1/4/7/8 in output: ',outputs.flat().filter(o => [2,4,3,7].includes(o.length)).length);

// part 2
h.print(' nof lines with 1,4,7 AND 8: ',displays.map(d => (dgot(d,2) && dgot(d,4) && dgot(d,3) && dgot(d,7)) ? 1 : 0).sum(),' out of ',displays.length);
var tOut: number[] = displays.map(d => translateDisplay(d)).map(d => +d[1].join(''));
h.print('part 2: sum of outputs: ',tOut.sum());