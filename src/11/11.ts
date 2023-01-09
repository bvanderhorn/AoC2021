import * as h from "../helpers";
var step = (octos:number[][]) : number[][] => {
    var newOctos = octos.plus(1);
    var todo: number[][] = newOctos.map((l,i) => l.map((o:number,j:number)=> o > 9 ? [i,j] : [-1,-1])).flat().filter(o => o[0] != -1);
    var visited: number[][] = [];
    while(todo.length > 0) {
        var current:number[] = todo.shift() ?? [-1,-1];
        var nb = h.getnb(current,[0,newOctos.length-1],[0,newOctos[0].length-1],'8');
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
var [t, flashes, newFlashes, newOctos, octolog] = [0, 0, 0, octopuses.copy(), ['original:\r\n' + stringOctos(octopuses)]];
while (true) {
    [t, newOctos] = [t+1, step(newOctos)];
    newFlashes = newOctos.flat().count(0);
    flashes += newFlashes;
    octolog.push('\r\nstep ' + t +' (' + newFlashes +' flashes):\r\n'+ stringOctos(newOctos));
    if (t==100) h.print('part 1: # flashes after 100 steps: ',flashes);
    if (newFlashes == newOctos.flat().length) break;
}
h.print('part 2: all octos flash on step: ',t);
h.write(11,'octolog.txt',octolog.join('\r\n'));