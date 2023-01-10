import * as h from "../helpers";
var abc = (a:number, b:number,c:number) : number[] => {
    let d = b*b - 4*a*c;
    return [(-b+ Math.sqrt(d))/2/a, (-b-Math.sqrt(d))/2/a];
}
var posaftersteps = (v:number, steps:number, xy:string) : number => v*(v+1)/2 - (steps > v && xy== 'x' ? 0 : (v-steps)*(v-steps+1)/2);
var target = h.read(17,'target.txt')[0].match(/^[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)\s*$/).slice(1).tonum();
var [xmin, xmax, ymin, ymax] = [target.slice(0,2).min(), target.slice(0,2).max(), target.slice(2,4).min(), target.slice(2,4).max()];
var [vxmin, vxmax, vymin, vymax] = [Math.ceil(abc(0.5, 0.5, -xmin).filter(v => v > 0).min()), xmax, ymin, (-ymin -1)];
h.print('part 1: vymax = ',vymax, ' => ',vymax*(vymax+1)/2);

var [xmaxsteps, ymaxsteps] = [vxmin, 2*vymax + 2];
var maxsteps = [xmaxsteps, ymaxsteps].max();
var [steps, xrange, yrange] = [h.range(1, maxsteps+1), h.range(xmin, xmax+1), h.range(ymin, ymax+1)];

//var vxSteps = h.range(vxmin, vxmax+1).map(v => [v, steps.map(s => xrange.includes(posaftersteps(v,s,'x')) ? s : 0).filter(s => s > 0)]).filter(vs => vs[1].length > 0);
var vxSteps: [number, number[]][] = h.range(vxmin, vxmax+1).map(v => [v, steps.map(s => xrange.includes(posaftersteps(v,s,'x')) ? s : 0).filter(s => s > 0)]);
h.print(vxSteps.length);
vxSteps = vxSteps.filter(vs => vs[1].length > 0);
h.print(vxSteps.length);
h.print(vxSteps[0][1]);
h.print([xmin, xmax, ymin, ymax]);
h.print([vxmin, vxmax, vymin, vymax]);
h.print([xmaxsteps, ymaxsteps]);
h.print(posaftersteps(100,3,'x'));
h.print(posaftersteps(10,9,'y'));
// h.print(vx);



