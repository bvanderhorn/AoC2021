import * as h from "../helpers";
var posFuel = (crabs: number[],pos:number) : number => crabs.map((c:number) => Math.abs(c-pos)).sum();
var crabs = h.read(7,'crabs.txt')[0].split(',').toInt();

// part 1: newton search
var [sl, sr] = [crabs.min(), crabs.max()];
var [pl, pmid, pr] = [[sl, posFuel(crabs,sl)], [Math.round((sl+sr)/2), posFuel(crabs,Math.round((sl+sr)/2))], [sr,posFuel(crabs,sr)]];
while(true) {
    var pml = [pmid[0]-1,posFuel(crabs,pmid[0]-1)];
    var pmr = [pmid[0]+1,posFuel(crabs,pmid[0]+1)];
    if ((pml[1] > pmid[1]) && (pmr[1] > pmid[1])) break;
    var toLeft = (pml[1] < pmid[1]);
    var newMid =  Math.round(( (toLeft ? pl[0] : pr[0] ) + pmid[0])/2);
    [pl, pmid, pr] =   [toLeft ? pl : pmid,[newMid,posFuel(crabs,newMid)], toLeft ? pmid : pr];
}
h.print('min fuel at ',pmid[0],': ',pmid[1]);