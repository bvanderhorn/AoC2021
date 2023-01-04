import * as h from "../helpers";
var posFuel = (crabs: number[],pos:number, part:number = 1) : number => crabs.map((c:number) => Math.abs(c-pos) * ((part==1) ? 1 :  ((Math.abs(c-pos)+1)/2))).sum();
var crabs = h.read(7,'crabs.txt')[0].split(',').toInt();

// part 1/2: newton search
var part = 1;
var [sl, sr] = [crabs.min(), crabs.max()];
var [pl, pmid, pr] = [[sl, posFuel(crabs,sl,part)], [Math.round((sl+sr)/2), posFuel(crabs,Math.round((sl+sr)/2),part)], [sr,posFuel(crabs,sr,part)]];
while(true) {
    var pml = [pmid[0]-1,posFuel(crabs,pmid[0]-1,part)];
    var pmr = [pmid[0]+1,posFuel(crabs,pmid[0]+1,part)];
    if ((pml[1] > pmid[1]) && (pmr[1] > pmid[1])) break;
    var toLeft = (pml[1] < pmid[1]);
    var newMid =  Math.round(( (toLeft ? pl[0] : pr[0] ) + pmid[0])/2);
    [pl, pmid, pr] =   [toLeft ? pl : pmid,[newMid,posFuel(crabs,newMid,part)], toLeft ? pmid : pr];
}
h.print('part ',part,': min fuel at ',pmid[0],': ',pmid[1]);