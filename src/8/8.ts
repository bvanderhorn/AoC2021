import * as h from "../helpers";
var dgot = (display:string[][], contains: number) : boolean => display.flat().map(s => s.length == contains ? 1 : 0).sum() > 0;
var get14 = (display:string[][]) : string[] => [display.flat().filter(d => d.length === 2)[0], display.flat().filter(d => d.length === 4)[0]];
var translate = (str:string, ex1:string, ex4: string) : string => {
    var sl = str.length;
    var sw1 = h.range(0,ex1.length).map(i => str.includes(ex1[i]) ? 1 : 0).sum();
    var sw4 = h.range(0,ex4.length).map(i => str.includes(ex4[i]) ? 1 : 0).sum();
    var numbers = [1,4,7,8,6,9,0,3,2,5];
    var checks = [sl==2, sl==4, sl==3, sl==7, sl==6 && sw1==1, sl==6 && sw4==4, sl==6, sl==5 && sw1==2, sl==5 && sw4==2, true];
    return "" + numbers[checks.indexOf(true)];
}
var translateDisplay = (display:string[][]) : string[][] => display.mape(str => translate(str,get14(display)[0],get14(display)[1]));
var displays = h.read(8,'displays.txt').split(/\s+\|\s+/).split(' ');
var outputs = displays.map(d => d[1]);
h.print('part 1: 1/4/7/8 in output: ',outputs.flat().filter(o => [2,4,3,7].includes(o.length)).length);

// part 2
h.print(' nof lines with 1,4,7 AND 8: ',displays.map(d => (dgot(d,2) && dgot(d,4) && dgot(d,3) && dgot(d,7)) ? 1 : 0).sum(),' out of ',displays.length);
var tOut: number[] = displays.map(d => translateDisplay(d)).map(d => +d[1].join(''));
h.print('part 2: sum of outputs: ',tOut.sum());