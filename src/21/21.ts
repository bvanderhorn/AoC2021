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
var getPaths21 = (start:number) : number[][] => {
  let paths : number[][] = h.ea(1e7);
  let index = [0];
  pathsTo21([start],paths,index);
  return paths.slice(0,index[0]);
}

var pathsNotTo21 = (path:number[],paths:number[][], index:number[],turn:number) : void => {
  for (const x of h.range(3,10)) {
    let nextPath = path.concat([mod(path.last()+x)]);
    if (nextPath.length === turn+1) {
      if (nextPath.slice(1).sum() < 21) {
          paths[index[0]] = nextPath;
          index[0]++;
          //h.progress(index[0],1e7,1000);
      }
    }
    else  if ((nextPath.length < (turn+1)) && (nextPath.slice(1).sum() < 21)) {
      pathsNotTo21(nextPath, paths,index,turn);
    } 
  }
}
var getPathsNot21 = (start:number, turn:number) : number[][] => {
  let paths : number[][] = h.ea(1e7);
  let index = [0];
  pathsNotTo21([start],paths,index,turn);
  return paths.slice(0,index[0]);
}
// var uniquePathsUpToTurnNot21 = (paths:number[][],turn:number):number[][] => paths.filter(p=>p.length > turn+1).map(p=>p.slice(0,turn+2)).unique();
// var uptCount = (paths:number[][],maxTurns:number) : number[] => h.range(0,maxTurns+1).map(t => uniquePathsUpToTurnNot21(paths,t).length);
var pathsNot21PerTurn = (start:number,maxTurns:number) : number[][][] => h.range(0,maxTurns+1).map(t => getPathsNot21(start,t));
var countNot21PerTurn = (start:number, maxTurns:number) : number[] => pathsNot21PerTurn(start, maxTurns).map(t => t.map(p => pathCount(p)).sum());
var dCount = [0,0,0,1,3,6,7,6,3,1,0];
var deltas = (path:number[]) : number[] => path.slice(1).map((p,i) => mod(p+10-path[i]));
var pathCount = (path:number[]) : number => deltas(path).map(d => dCount[d]).prod();
var turnsCount = (paths:number[][], turns:number) : number => paths.filter(p=>p.length === turns+1).map(p=> pathCount(p)).sum();
var turnsCountArray = (paths:number[][], maxTurns:number) : number[] => h.range(0,maxTurns+1).map(t=>turnsCount(paths,t));
let [pathsA, pathsB] = start.map(s => getPaths21(s));
let maxTurns = pathsA.map(p => p.length).concat(pathsB.map(p=>p.length)).max()-1;
let [tcA,tcB] = [pathsA,pathsB].map(p => turnsCountArray(p,maxTurns));
let [uptA, uptB] = start.map(s => pathsNot21PerTurn(s,maxTurns).map(p=>p.length));
let [ncA, ncB] = start.map(s => countNot21PerTurn(s,maxTurns));
// let Awins = tcA.map((tc,i) => tcB.slice(0,i).sum()*tc).sum();
// let Bwins = tcB.map((tc,i) => tcA.slice(0,i).sum()*tc).sum();

// h.print(deltas([5,1,4,1,4,2,1,4,2,1,4]));
// h.print(pathCount([5,1,4,1,4,2,1,4,2,1,4]));
h.print(getPathsNot21(5,2));

h.print('nof paths for ',start[0],': ',pathsA.length);
h.print('nof paths for ',start[1],': ',pathsB.length);
h.print('max Turns: ',maxTurns);
h.print('unique variants to 21 in turns for A: ',tcA);
h.print('unique variants to 21 in turns for B: ',tcB);
h.print('unique variants not 21 up to turns for A: ',ncA);
h.print('unique variants not 21 up to turns for B: ',ncB);
// h.print('player A wins in: ',Awins);
// h.print('player B wins in: ',Bwins);
// pathsA.sort((a,b) => b.length - a.length).slice(0,30).print(',');