import * as h from "../helpers";
var sfn = h.read(18,'sfnumbers.txt');
var puresf = (sf:string):number[] => sf.slice(1,sf.length-1).split(',').tonum();
var addtonum = (str:string, num:number, last:boolean = false) : string => {
  var index = last ? str.search(/(\d+)(?!\D*\d)/) : str.search(/\d/);
  if (index == -1) return str;
  var len = str.slice(index).search(/[\,\[\]]|$/);
  var newnum = +str.slice(index,index+len) + num;
  return str.slice(0,index) + "" + newnum + str.slice(index+len);
}
var explode = (sf:string) : string => {
  var depth = 0;
  for(const i of h.range(0,sf.length)) {
    if(sf[i]=='[') depth++;
    if(sf[i]==']') depth--;
    if(depth==5) {
      let sub4 = sf.slice(i).replace(/\].*/,']');
      let [left, right, sub4p] = [sf.slice(0,i), sf.slice(i + sub4.length), puresf(sub4)];
      return addtonum(left,sub4p[0],true) + '0' + addtonum(right,sub4p[1]);
    }
  }
  return sf;
}
var split = (sf:string) : string => {
  var index = sf.search(/\d{2,}/);
  if (index == -1) return sf;
  var len = sf.slice(index).search(/[\,\[\]]|$/);
  var num = +sf.slice(index,index+len);
  return sf.slice(0,index) + "[" + Math.floor(num/2) + ',' + Math.ceil(num/2) + ']' + sf.slice(index+len);
}
var reduce = (sf:string) : string => {
  var exploded = explode(sf);
  return exploded === sf ? split(sf) : exploded;
}
var add = (sf1:string, sf2:string) : string => {
  var sfnew = '[' + sf1 + ',' + sf2 + ']';
  while (true) {
    let sfnewer = reduce(sfnew);
    if (sfnewer === sfnew) break;
    sfnew = sfnewer;
  }
  return sfnew;
}
var magnitude = (sf:string) : number => {
  var sfnew = sf+"";
  while(true) {
    let index = sfnew.search(/\[\d+\,\d+\]/);
    if (index == -1) break;
    let len = sfnew.slice(index).search(/\]/) + 1;
    let ps = puresf(sfnew.slice(index, index+len));
    sfnew = sfnew.slice(0,index) + "" + (ps[0]*3 + ps[1]*2) + sfnew.slice(index+len);
  }
  return +sfnew;
}

h.print(sfn.slice(0,2));
h.print(addtonum('[[34,5]]]',12));
h.print(addtonum('[[34,28',12,true));
h.print(explode(explode('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')));
h.print(split(explode(explode(split(split('[[[[0,7],4],[15,[0,13]]],[1,1]]'))))));
h.print(add('[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]','[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]'));
h.print(magnitude('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'));