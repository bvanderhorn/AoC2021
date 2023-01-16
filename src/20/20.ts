import * as h from "../helpers";
var addZeros = (floor:number[][]) : number[][] => {
    let dims = floor.dims();
    return [h.ea(dims[1]+2,0), ...floor.map(f => [0, ...f, 0]), h.ea(dims[1]+2,0)];
}
var enhance = (floor:number[][], alg:number[]) : number[][] => {
    let dims = floor.dims();
    let out = floor.mapij((i,j,_) => {
        let nb:number[][] = h.getnb([i,j],0,0,'9nf').sort((a,b) => a[0] - b[0] || a[1] - b[1]);
        let bin:string = nb.map((n:number[]) => (n.min() < 0 || n[0] >= dims[0] || n[1] >= dims[1]) ? 0: floor[n[0]][n[1]]).join('');
        return alg[parseInt(bin,2)];
    });
    out.mape(x=>x==1?'#':'.').printc(x=>x=='#','r');
    h.print('');
    return out;
}
var enhanceTimes = (floor:number[][], alg:number[], times:number): number[][] => {
    let out = floor.copy();
    for(let i=0;i<times;i++) out = enhance(addZeros(out),alg);
    return out;
}

let [alg, floor] = h.read(20,'floor.txt','ex').split('');
alg = alg[0].map((a:string) => a==='#' ?1:0);
floor = floor.mape((x:string) => x==='#' ?1:0);
floor.mape(x=>x==1 ? '#':'.').printc(x=>x=='#','c');
h.print('');
h.print('part 1: number of lit pixels after 2 enhancements: ',enhanceTimes(floor,alg,2).sum1().sum());