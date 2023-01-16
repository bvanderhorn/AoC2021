import * as h from "../helpers";
let [alg, floor] = h.read(20,'floor.txt').split('');
alg = alg[0].map((a:string) => a==='#' ?1:0);
floor = floor.mape((x:string) => x==='#' ?1:0);
h.print(alg);
// h.print(floor.stringcolor(x=>x===1,'c'));
floor.printcolor(x=>x===1,'c');
// floor.print();