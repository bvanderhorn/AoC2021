import * as h from '../helpers';
// helpers
var getEntryPoint = (i: number) : number => 2 + 2*i;
var isEmptyOrContainsOnly = (i: number, j: number, burrows: number[][]) : boolean => burrows[i].every((x: number) => x == j);
var canSet = (pod: number, burrows: number[][]) : boolean => isEmptyOrContainsOnly(pod, pod, burrows);
var stepsOut = (lengthBefore:number) : number => depth - lengthBefore + 1;
var stepsIn = (lengthBefore: number) : number => depth - lengthBefore;
var isReachable = (alley: number[], from: number, to: number) : boolean => {
    var subAlley = alley.slice(Math.min(from, to) + 1, Math.max(from, to) + 1);
    return subAlley.every(x => x == -1);
}

var copyState = (state: state) : state => {
    return {
        burrows: state.burrows.copy(),
        alley: state.alley.copy(),
        points: state.points
    }
};
var getRestOptions = (entryPoint:number, alley: number[], rests: number[]) : number[] => {
    var options : number[] = [];
    for (const rest of rests) {
        if (isReachable(alley, entryPoint, rest)) options.push(rest);
    }
    return options;
}
var getDirectMove = (state: state) : state | undefined => {
    // direct move from alley
    for (var i = 0; i < state.alley.length; i++) {
        if (state.alley[i] == -1) continue;

        var pod = state.alley[i];
        var entryPoint = i;
        var homePoint = getEntryPoint(pod);
        
        if (isReachable(state.alley, entryPoint, homePoint) && canSet(pod, state.burrows)) {
            var addPoints = stepsIn(state.burrows[pod].length) + Math.abs(homePoint - entryPoint);
            var newState = copyState(state);
            newState.alley[i] = -1;
            newState.burrows[pod].push(pod);
            newState.points += addPoints;
            return newState;
        }
    }

    // direct move from burrow
    for (var i = 0; i < state.burrows.length; i++) {
        // skip burrows that are empty or contain only their home pods
        if (canSet(i, state.burrows)) continue;

        var pod: number = state.burrows[i].last();
        var entryPoint = getEntryPoint(i);
        var homePoint = getEntryPoint(pod);
        
        if (isReachable(state.alley, entryPoint, homePoint) && canSet(pod, state.burrows)) {
            var addPoints = stepsOut(state.burrows[i].length) + stepsIn(state.burrows[pod].length) + Math.abs(homePoint - entryPoint);
            var newState2 = copyState(state);
            newState2.burrows[i].pop();
            newState2.burrows[pod].push(pod);
            newState2.points += addPoints;
            return newState2;
        }
    }

    return undefined;
}

var getNextStates = (state: state) : state[] => {
    // return direct move if exists
    var directMove = getDirectMove(state);
    if (directMove != undefined) return [directMove];

    // else calculate possible moves; since no direct move exists, we can only move from burrow to alley
    var options : state[] = [];
    for (var i=0; i<state.burrows.length; i++) {
        var burrow = state.burrows[i];
        // skip burrows that are empty or contain only their home pods
        if (canSet(i, state.burrows)) continue;

        var pod : number = burrow.last();
        var entryPoint = getEntryPoint(i);
        var restOptions = getRestOptions(entryPoint, state.alley, rests);
        for (const rest of restOptions) {
            var addPoints = stepsOut(burrow.length) + Math.abs(rest - entryPoint);
            var newState = copyState(state);
            newState.burrows[i].pop();
            newState.alley[rest] = pod;
            newState.points += addPoints;
            options.push(newState);
        }
    }
    return options;
}

var equalStates = (s1: state, s2: state) : boolean => h.equals2(s1.burrows, s2.burrows) && h.equals2(s1.alley, s2.alley);
var removeDuplicates = (states: state[]) : state[] => {
    var result : state[] = [];
    for (const state of states) {
        var existing = result.find(s => equalStates(s, state));
        if (existing == undefined) result.push(state);
        else if (state.points < existing.points) existing.points = state.points;
    }
    return result;
}

var sortStates = (states: state[]) : void => {
    states.sort((a,b) => a.points - b.points);
}
var stateIsFinal = (state: state) : boolean => state.burrows.every((_, i) => canSet(i, state.burrows)) && state.alley.every(x => x == undefined);

// init
var types = 'ABCD';
var input = h.read(23,'amphipods.txt').mape(l => l.replace(/[\W]/g,'').replace(/\w/g, (m:string) => types.indexOf(m))).filter(l => l).reverse().split('').transpose().tonum();
h.print(input);
var pods = h.range(0, input.length);
var depth = input[0].length;

var alley : number[] = h.ea(11,-1);
var entryPoints = pods.map(r => getEntryPoint(r));
var rests : number[] = h.range(0,alley.length).filter(i => !entryPoints.includes(i));

type state = {
    burrows: number[][],
    alley: number[],
    points: number
}

// Dijkstra
var startState : state = {
    burrows: input,
    alley: alley,
    points: 0
}
var statesToCheck: state[] = [startState];
var lowestEndPoints = 1E8;
var loopCounter = 0;
while (statesToCheck.length > 0) {
    if (loopCounter % 50 == 0) h.print(`loop ${loopCounter}: ${statesToCheck.length} states to check`);
    var currentState = statesToCheck.shift();
    var nextStates = getNextStates(currentState!);
    while (nextStates.length > 0) {
        var nextState = nextStates.pop();
        if (stateIsFinal(nextState!)) {
            if (nextState!.points < lowestEndPoints) {
                lowestEndPoints = nextState!.points;
                h.print(`new lowest state on loop ${loopCounter}: ${nextState!.points}`);
            }
            lowestEndPoints = Math.min(lowestEndPoints, nextState!.points);
            continue;
        }
        statesToCheck.push(nextState!);
    }
    statesToCheck = statesToCheck.filter(s => s.points < lowestEndPoints);
    statesToCheck = removeDuplicates(statesToCheck);
    sortStates(statesToCheck);
    loopCounter++;
}
