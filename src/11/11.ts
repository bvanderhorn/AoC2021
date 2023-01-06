import * as h from "../helpers";
// var newState = (octos:number[][]) : number[][] => {
//     var newOctos = octos.plus(1);
//     newOctos = newOctos.map((l,i) => l.map((o,j) => {
//         var nb = h.getNeighbours([i,j],[0,octos.length-1],[0,octos[0].length -1],'8');
//         return o + nb.map()
//     }));
// }
var octopuses = h.read(11,'octopuses.txt').map(l => l.split('').tonum());
h.print(octopuses.slice(0,2));
h.print(["123|456","789|012"].split('|').split(''));