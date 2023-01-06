import { write } from "fs";
import * as h from "../helpers";
var up = (octos:number[][]) : number[][] => {
    var newOctos = octos.plus(1);
    var todo: number[][] = newOctos.map((l,i) => l.map((o:number,j:number)=> o > 9 ? [i,j] : [-1,-1])).flat().filter(o => o[0] != -1);
    var visited: number[][] = [];
    while(todo.length > 0) {
        var current:number[] = todo.shift() ?? [-1,-1];
        var nb = h.getNeighbours(current,[0,newOctos.length-1],[0,newOctos[0].length-1],'8');
        nb.forEach(n => {
            newOctos[n[0]][n[1]]++;
            if (newOctos[n[0]][n[1]]>9 && !todo.concat(visited).includes2(n)) todo.push(n);
        });
        visited.push(current);
    }
    return newOctos.map(l => l.map((o:number) => o > 9 ? 0 : o));
}
var stringOctos = (octos:number[][]) : string => octos.map(l => l.join('')).join('\r\n');
var octopuses = h.read(11,'octopuses.txt').split('').tonum();
var [flashes, newOctos, octolog] = [0, octopuses.copy(), ['original:\r\n' + stringOctos(octopuses)]];
for (const t of h.range(1,101)) {
    newOctos = up(newOctos);
    flashes += newOctos.flat().count(0);
    octolog.push('\r\nstep ' + t +' (' + newOctos.flat().count(0) +' flashes):\r\n'+ stringOctos(newOctos));
}
h.print('# flashes: ',flashes);
h.write(11,'octolog.txt',octolog.join('\r\n'));