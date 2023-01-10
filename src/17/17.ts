import * as h from "../helpers";
var abc = (a:number, b:number,c:number) : number[] => {
    let d = b*b - 4*a*c;
    return [(-b+ Math.sqrt(d))/2/a, (-b-Math.sqrt(d))/2/a];
}
var xposaftersteps = (v:number, steps:number) : number => v*(v+1)/2 - (v-steps)*(v-steps+1)/2;
var target = h.read(17,'target.txt')[0].match(/^[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)[^\d-]+(-?\d+)\s*$/).slice(1).tonum();
var [xmin, xmax, ymin, ymax] = [target.slice(0,2).min(), target.slice(0,2).max(), target.slice(2,4).min(), target.slice(2,4).max()];
var [vxmin, vxmax, vymin, vymax] = [Math.ceil(abc(0.5, 0.5, -xmin).filter(v => v > 0).min()), xmax, ymin, (-ymin -1)];
h.print('part 1: vymax = ',vymax, ' => ',vymax*(vymax+1)/2);

var [xmaxsteps, ymaxsteps] = [vxmin, 2*vymin + 2];
var vx = h.range(vxmin, vxmax+1).map(v => h.range(1,xmaxsteps+1).map(s => xposaftersteps(v,s)).some(p => h.range(xmin, xmax+1).includes(p)) ? v : undefined).filter(v => v != undefined);
h.print([xmin, xmax, ymin, ymax]);
h.print([vxmin, vxmax, vymin, vymax]);
h.print([xmaxsteps, ymaxsteps]);
h.print(xposaftersteps(100,3));
h.print(vx);



