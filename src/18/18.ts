import * as h from "../helpers";
var sfn = h.read(18,'sfnumbers.txt');
var puresf = (sf:string):number[] => sf.slice(1,sf.length-1).split(',').tonum();
var addtonum = (str:string, num:number, last:boolean = false) : string => {
  var nnindex = last ? str.search(/(\d+)(?!\D*\d)/) : str.search(/\d/);
  if (nnindex == -1) return str;
  var len = str.slice(nnindex).search(/[\,\[\]]|$/);
  var newnum = +str.slice(nnindex,nnindex+len) + num;
  return str.slice(0,nnindex) + "" + newnum + str.slice(nnindex+len);
}
var explode = (sf:string) : string => {
  var depth = 0;
  for(const i of h.range(0,sf.length)) {
    if(sf[i]=='[') depth++;
    if(sf[i]==']') depth--;
    if(depth==4) {
      let sub4 = sf.slice(i).replace(/\].*/,']');
      let [left, right, sub4p] = [sf.slice(0,i), sf.slice(i + sub4.length), puresf(sub4)];
      return addtonum(left,sub4p[0],true) + '0' + addtonum(right,sub4p[1]);
    }
  }
  return sf;
}

h.print(sfn.slice(0,2));
h.print(addtonum('[[34,5]]]',12));
h.print(addtonum('[[34,28',12,true));
h.print(explode(explode('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')));

