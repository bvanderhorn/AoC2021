import * as h from '../helpers';
var die = [[6,5],[4,3],[2,1],[0,9],[8,7]];
var roll = (cur:number[],turn:number) : number[] => {
  let d = die[turn%5];
  return [cur, d].sum0().mod(10).map(x => x===0 ?10:x) 
}
let [cur, turn, score] = [[5,9],0,[0,0]];
while(score.max()<1000) {
  cur = roll(cur,turn);
  score[0] += cur[0];
  score[1] += score[0]>=1000 ?0:cur[1];
  turn++;
}
let rolls = 6*turn - (score[0]>=1000 ?3:0);
h.print('part 1: losing score times die rolls: ',rolls*score.min());
