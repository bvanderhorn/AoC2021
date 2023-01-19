import * as h from '../helpers';
var die = [[6,5],[4,3],[2,1],[0,9],[8,7]];
var roll = (cur:number[],turn:number) : number[] => {
  let d = die[turn%5];
  return [cur, d].sum0().mod(10).map(x => x===0 ?10:x) 
}
let start = [5,9];
let [cur, turn, score] = [start,0,[0,0]];
while(score.max()<1000) {
  cur = roll(cur,turn);
  score[0] += cur[0];
  score[1] += score[0]>=1000 ?0:cur[1];
  turn++;
}
let rolls = 6*turn - (score[0]>=1000 ?3:0);
h.print('part 1: losing score times die rolls: ',rolls*score.min());

// dirac
var mod = (cur:number) : number => cur<=10 ? cur : cur%10;
var pathsTo21 = (path:number[],paths:number[][], index:number[]) : void => {
  for (const x of h.range(3,10)) {
    let nextPath = path.concat([mod(path.last()+x)]);
    if (nextPath.slice(1).sum() >= 21) {
      paths[index[0]] = nextPath;
      index[0]++;
      //h.progress(index[0],1e7,1000);
    }
    else pathsTo21(nextPath, paths,index);
  }
}
var getPaths = (start:number) : number[][] => {
  let paths : number[][] = h.ea(1e7);
  let index = [0];
  pathsTo21([start],paths,index);
  return paths.slice(0,index[0]);
}
let [pathsA, pathsB] = start.map(s => getPaths(s));

h.print('nof paths for ',start[0],': ',pathsA.length);
h.print('nof paths for ',start[1],': ',pathsB.length);
pathsA.slice(0,30).print(',');
