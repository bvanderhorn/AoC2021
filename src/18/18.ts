import * as h from "../helpers";
var sfn = h.read(18,'sfnumbers.txt');
var puresf = (sf:string):number => sf.slice(1,sf.length-1).split(',').tonum();
var explode = (sf:string) : string => {
  var depth = 0;
  for(const i of h.range(0,sf.length)) {
    if(sf[i]=='[') depth++;
    if(sf[i]==']') depth--;
    if(depth==4) 
  }
}


h.print(sfn.slice(0,2));
