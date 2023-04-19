import * as h from '../helpers';
// helpers
var getEntryPoint = (i: number) : number => 2 + 2*i;
var isEmptyOrContainsOnly = (i: number, j: number, burrows: number[][]) : boolean => burrows[i].every((x: number) => x == j);
var canSet = (pod: number, burrows: number[][]) : boolean => isEmptyOrContainsOnly(pod, pod, burrows);
var stepsOut = (lengthBefore:number) : number => depth - lengthBefore + 1;
var stepsIn = (lengthBefore: number) : number => depth - lengthBefore;
var isReachable = (alley: number[], from: number, to: number) : boolean => {
    var subAlley = alley.slice(Math.min(from, to) + 1, Math.max(from, to));
    return subAlley.every(x => x == -1) && alley[to] == -1;
}

var copyState = (state: state) : state => {
    return {
        burrows: state.burrows.copy(),
        alley: state.alley.copy(),
        points: state.points,
        moves: state.moves,
        history: state.history.map(x => x)
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
            newState.points += addPoints*multiplier[pod];
            newState.moves++;
            newState.history.push(state);
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
            newState2.points += addPoints*multiplier[pod];
            newState2.moves++;
            newState2.history.push(state);
            return newState2;
        }
    }

    return undefined;
}

var homeMovesOverlap = (from1: number, to1: number, from2: number, to2: number) : boolean => {
    return (from1 < from2 && to1 > from2) || (from1 < to2 && to1 > to2);
}

var stateIsDead = (state: state) : boolean => {
    // state is dead if two pods in the alley are in between each other's path to home
    for (var i=0; i<state.alley.length; i++) {
        if (state.alley[i] == -1) continue;
        var pod = state.alley[i];
        var entryPoint = i;
        var homePoint = getEntryPoint(pod);
        var direction = Math.sign(homePoint - entryPoint);
        for (const j of h.range(Math.min(entryPoint, homePoint) + 1, Math.max(entryPoint, homePoint))) {
            if (state.alley[j] == -1) continue;
            var pod2 = state.alley[j];
            var entryPoint2 = j;
            var homePoint2 = getEntryPoint(pod2);
            var direction2 = Math.sign(homePoint2 - entryPoint2);
            if (direction !== direction2 && homeMovesOverlap(entryPoint, homePoint, entryPoint2, homePoint2)) return true;
        }
    }
    return false;
}

var printState = (state: state, suppressPrint:boolean = false) : string[] => {
    var pointString = "p: " + state.points.toString();
    var str = "\n" + pointString + " ".repeat(alley.length + 2 - pointString.length) + "\n";
    str +=  "#".repeat(alley.length + 2) + '\n';
    str +=  `#${state.alley.map(x => x == -1 ? '.' : types[x]).join('')}#\n`;
    str += `###${state.burrows.map(b => b.length > 1 ? types[b[1]] : '.').join('#')}###\n`;
    str += `  #${state.burrows.map(b => b.length > 0 ? types[b[0]] : '.').join('#')}#  \n`;
    str += '  ' + '#'.repeat(alley.length-2) + '  \n';
    
    if (!suppressPrint) console.log(str);
    return str.split('\n');
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
            newState.points += addPoints*multiplier[pod];
            newState.moves++;
            newState.history.push(state);
            options.push(newState);
        }
    }
    return options;
}

var printStates = (states: state[], fileName:string) : void => {
    var stateStrings = states.map(s => printState(s, true));
    var lines = stateStrings[0].map((_, i) => stateStrings.map(s => s[i]).join("  "));
    h.write(23, `${fileName}.txt`, lines.join(`\n`));
}

var getNextStatesAndPrint = (state: state, fileName: string = 'nextStates.txt') : state[] => {
    var stateStrings = printState(state, true);
    var middleStrings : string[]  = h.ea(stateStrings.length, "    "); 
    middleStrings[Math.ceil(stateStrings.length / 2)] = " => ";
    var nextStates = getNextStates(state);
    var nextStateStrings = nextStates.map(s => printState(s, true));
    for (var i=0; i<stateStrings.length; i++) {
        stateStrings[i] += middleStrings[i] + nextStateStrings.map(s => s[i]).join("  ");
    }

    //console.log(stateStrings.join('\n'));
    h.write(23, fileName, stateStrings.join('\n'));
    return nextStates;
}

var printHistory = (state: state) : void => {
    var states = state.history;
    states.push(state);
    printStates(states, `moves_${state.moves}_points_${state.points}`);
}

var equalStates = (s1: state, s2: state) : boolean => h.equals2(s1.burrows, s2.burrows) && h.equals2(s1.alley, s2.alley);

var stateIsFinal = (state: state) : boolean => state.burrows.every((_, i) => canSet(i, state.burrows)) && state.alley.every(x => x == -1);

var removeDuplicates = (states: state[]) : state[] => {
    var result : state[] = [];
    for (const state of states) {
        var existing = result.findIndex(s => equalStates(s, state));
        if (existing == -1) result.push(state);
        else if (state.points < result[existing].points) result[existing] = state;
    }
    return result;
}

// init
var types = 'ABCD';
var input = h.read(23,'amphipods.txt').mape(l => l.replace(/[\W]/g,'').replace(/\w/g, (m:string) => types.indexOf(m))).filter(l => l).reverse().split('').transpose().tonum();
h.print(input);
var pods = h.range(0, input.length);
var depth = input[0].length;
var multiplier = h.range(0,input.length).map(i => Math.pow(10, i));
h.print(multiplier);

var alley : number[] = h.ea(11,-1);
var entryPoints = pods.map(r => getEntryPoint(r));
var rests : number[] = h.range(0,alley.length).filter(i => !entryPoints.includes(i));

type state = {
    burrows: number[][],
    alley: number[],
    points: number,
    moves: number,
    history: state[]
}


// testing

var testDeadState : state = {
    burrows: [[0],[1,1],[2,2],[3]],
    alley: [-1,-1,-1,3,-1,-1,-1,0,-1,-1,-1],
    points: 100,
    moves: 1,
    history: []
}

var testState : state = {
    burrows: [[1,3],[0],[3,1],[2]],
    alley: [-1,0,-1,-1,-1,2,-1,-1,-1,-1,-1],
    points: 100,
    moves: 1,
    history: []
}

h.print(getRestOptions(4, [-1, 3, -1, -1, -1, 2 , -1, -1, -1, -1, -1], [0,1,3,5,7,9,10]))
h.print(stateIsDead(testDeadState));

// Dijkstra
var startState : state = {
    burrows: input,
    alley: alley,
    points: 0,
    moves: 0,
    history: []
}

getNextStatesAndPrint(startState);

// startState = {
//     burrows: [[1,3], [0,0], [3,1], [2]],
//     alley: [-1,-1,  -1,-1,-1,-1,-1,-1,-1,  2,-1],
//     points: 200,
//     moves: 1,
//     history: [copyState(startState)]
// }

var statesToCheck: state[] = [startState];
var lowestEndPoints = 1E8;
var loopCounter = 0;
var checkedStates : state[] = [];

var moves = 0;
console.time("day 23");
while (statesToCheck.length > 0) {
    if (moves != statesToCheck[0].moves) {
        moves = statesToCheck[0].moves;
        statesToCheck = removeDuplicates(statesToCheck);
        h.print(`move: ${moves}, states: ${statesToCheck.length}`);
    }
    var currentState = statesToCheck.shift();
    var nextStates = getNextStates(currentState!);
    while (nextStates.length > 0) {
        var nextState = nextStates.pop();
        if (stateIsFinal(nextState!)) {
            if (nextState!.points < lowestEndPoints) {
                lowestEndPoints = nextState!.points;
                statesToCheck = statesToCheck.filter(s => s.points < lowestEndPoints);
                h.print(`new lowest finish on move ${nextState!.moves}: ${nextState!.points}`);
                printHistory(nextState!);
            }
            lowestEndPoints = Math.min(lowestEndPoints, nextState!.points);
            continue;
        }
        if (stateIsDead(nextState!)) continue;
        if (nextState!.points > lowestEndPoints) continue;
        statesToCheck.push(nextState!);
    }
    checkedStates.push(currentState!);
    loopCounter++;
}
console.timeEnd("day 23");
