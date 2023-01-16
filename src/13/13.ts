import * as h from "../helpers";
var foldDot = (dot:number[],fold:number[]) : number[] => {
    let folded =  [2*fold[1] - dot[fold[0]],dot[1-fold[0]]];
    return fold[0] == 1 ? folded.reverse() : folded;
}
var [dots, folds] = h.read(13,'sheet.txt');
dots = dots.split(',').tonum().map((d:number[]) => d.reverse());
folds = folds.split('=').map((f:string[]) => [f[0].slice(-1) == 'x' ? 1 : 0, +f[1]]);
h.print('initial dots: ',dots.length);
var newDots = dots.copy();
for (const f of folds) {
    newDots = newDots.map((d:number[]) => d[f[0]] > f[1] ? foldDot(d,f) : d).unique();
    h.print(' dots left: ',newDots.length);
}
var [yMax, xMax] = [newDots.col(0).max(), newDots.col(1).max()];
var letters = h.ea([yMax+1, xMax+1]).mapij((i,j,_) => newDots.includes2([i,j]) ? '#' : '.').string();
h.print(letters);