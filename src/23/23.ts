import * as h from '../helpers';
var types = 'ABCD';
var input = h.read(23,'amphipods.txt').mape(l => l.replace(/[\W]/g,'').replace(/\w/g, (m:string) => types.indexOf(m))).filter(l => l).reverse().split('').transpose().tonum();
h.print(input);
var pods = h.range(0, input.length);
var depth = input[0].length;

var alley : number[] = h.ea(11);

type state = {
    burrows: number[][],
    alley: number[]
}

h.print(alley);

// helpers
var getEntryPoint = (i: number) : number => 2 + 2*i;
var isEmptyOrContainsOnly = (i: number, j: number, burrows: number[][]) : boolean => burrows[i].every((x: number) => x == j);
var canSet = (pod: number, burrows: number[][]) : boolean => isEmptyOrContainsOnly(pod, pod, burrows);
var stepsOut = (lengthBefore:number) : number => depth - lengthBefore + 1;
var stepsIn = (lengthBefore: number) : number => depth - lengthBefore;
var isReachable = (alley: number[], from: number, to: number) : boolean => {
    var subAlley = alley.slice(Math.min(from, to) + 1, Math.max(from, to) + 1);
    return subAlley.every(x => x == undefined || x == null);
}
var restOptions = (entryPoint:number, alley: number[], rests: number[]) : number[] => {
    var options : number[] = [];
    for (const rest of rests) {
        if (isReachable(alley, entryPoint, rest)) options.push(rest);
    }
    return options;
}
var entryPoints = pods.map(r => getEntryPoint(r));
var rests : number[] = h.range(0,alley.length).filter(i => !entryPoints.includes(i));

h.print(input[0].last());
h.print(entryPoints);
h.print(rests);

var multiplier = pods.map(i => Math.pow(10,i));
var stepsTaken = h.ea(pods.length, 0);
h.print(stepsTaken);
h.print(multiplier);
h.print(multiplier.slice(1,3));

// full search
var getMoveOptions = (state: state) : state[] => {
    var options : state[] = [];
    
    return options;
}
var getPointsFromState(state: state) : number => {
    
}
