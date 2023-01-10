import * as h from "../helpers";
var abc = (a:number, b:number,c:number) : number[] => {
    let d = b*b - 4*a*c;
    return [(-b+ Math.sqrt(d))/2/a, (-b-Math.sqrt(d))/2/a];
} 
var vSteps = (dir:string, prange:number[], vrange:number[], steps:number[]): [number, number[]][] => {
  var out: [number, number[]][] = vrange.map(v => [v, steps.map(s => prange.includes(posaftersteps(v,s,dir)) ? s : 0).filter(s => s > 0)]);
 return out.filter(vs => vs[1].length > 0);
}
var posaftersteps = (v:number, steps:number, xy:string) : number => v*(v+1)/2 - (steps > v && xy== 'x' ? 0 : (v-steps)*(v-steps+1)/2);
console.time("day 17");
var target = h.read(17,'target.txt')[0].match(/^[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)\s*$/).slice(1).tonum();
var [xmin, xmax, ymin, ymax] = [target.slice(0,2).min(), target.slice(0,2).max(), target.slice(2,4).min(), target.slice(2,4).max()];
var [vxmin, vxmax, vymin, vymax] = [Math.ceil(abc(0.5, 0.5, -xmin).filter(v => v > 0).min()), xmax, ymin, (-ymin -1)];
h.print('part 1: vymax = ',vymax, ' => ',vymax*(vymax+1)/2);

var [xmaxsteps, ymaxsteps] = [vxmin, 2*vymax + 2];
var maxsteps = [xmaxsteps, ymaxsteps].max();
var [steps, xrange, yrange, vxrange, vyrange] = [h.range(1, maxsteps+1), h.range(xmin, xmax+1), h.range(ymin, ymax+1), h.range(vxmin,vxmax+1), h.range(vymin, vymax+1)];
var [xSteps, ySteps] = [vSteps('x', xrange, vxrange, steps), vSteps('y', yrange, vyrange, steps)];
var vcom = xSteps.map(xs => ySteps.filter(ys=> xs[1].includesAny(ys[1])).map(ys => [xs[0], ys[0]])).flat();
h.print('part 2: nof unique initial velocities: ',vcom.length);
console.timeEnd("day 17");
