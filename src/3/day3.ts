import * as h from "../helpers";
var majorities = (arr: number[][]) : number[] => arr.sum0().map((el:number) => (el >= (arr.length/2)) ? 1 : 0);
var minorities = (arr: number[][]) : number[] => majorities(arr).map((el:number) => 1 - el);
const arrays = h.read(3,'binaries.txt').map(el => el.split('').map((x:string) => +x));

// part 1
const [gamma, epsilon] = [majorities(arrays).join(''), minorities(arrays).join('')];
h.print('gamma: ',gamma, ', epsilon: ',epsilon,' => product: ',parseInt(gamma,2)*parseInt(epsilon,2));

// part 2
var [ox, co] = [arrays.map(el => el), arrays.map(el => el)];
for (let i=0; i<arrays[0].length; i++) {
    ox = ox.filter(el => el[i] === majorities(ox)[i]);
    if (co.length > 1) co = co.filter(el => el[i] === minorities(co)[i]);
}
var [oxS, coS] = [ox[0].join(''), co[0].join('')];
h.print('ox: ',oxS,', co2: ',coS, ' => product: ',parseInt(oxS,2)*parseInt(coS,2));