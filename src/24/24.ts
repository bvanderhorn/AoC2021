import * as h from '../helpers';
// helpers
var executeInstruction = (instruction: string[], wxyz: number[], input: number) : void => {
    let [w, x ,y, z] = wxyz;
    var operator = ["+","*", "%", "/", '==='];
    var command = ["add", "mul", "mod", "div", "eql"];

    var executionString = "";
    if (instruction[0] == 'inp') executionString = `${instruction[1]} = ${input}`;
    else executionString = `${instruction[1]} = Math.floor(+(${instruction[1]} ${operator[command.findIndex(x => x==instruction[0])]} ${instruction[2]}))`;
    
    var q = eval(executionString);
    //h.print(" executing: " + instruction.join(" ") + " => " + executionString + " => " + q);

    wxyz[0] = w;
    wxyz[1] = x;
    wxyz[2] = y;
    wxyz[3] = z;
}
var executeInstructionSet = (instructions: string[][], input: number, wxyz: number[] = [0,0,0,0]) : number[] => {
    instructions.forEach(x => executeInstruction(x, wxyz, input));
    //h.print(wxyz);
    return wxyz;
}
var executeMonad = (instructionSets: string[][][], input: string, wxyz: number[] = [0,0,0,0]) : number[] => {
    return instructionSets.map((x,i) => executeInstructionSet(x, +input[i], wxyz)[3] );
}
var printInstructionSets = (instructionSets: string[][][]) : void => {
    var columnWidth = 10;
    var str = h.range(0, instructionSets.length).map(x => "# " + x + " ".repeat(columnWidth - ("# " + x).length)).join("") + "\n";
    str += instructionSets[0].map((_,i) => instructionSets.map(x => x[i].join(" ") + " ".repeat(columnWidth -1 - x[i].join(" ").length)).join(" ")).join("\n");
    h.write(24, "instructionsets.txt", str);
}

var getNextStates = (state: state, instructionSets: string[][][], part: number) : state[] => {
    var states: state[] = [];
    var q = state.numbers.length;
    var checkNumbers = part == 2 ? h.range(1, 10) : h.range(1, 10).reverse();

    for (const i of checkNumbers) {
        var wxyz = executeInstructionSet(instructionSets[q], i, [0,0,0,state.zs.last()]);
        if (wxyz[3] >= zmin[q] && wxyz[3] <= zmax[q]) {
            states.push({
                numbers: state.numbers.concat(i),
                zs: state.zs.concat(wxyz[3])
            })
        }
    }
    return states;
}

var instructionSets = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
//h.print(instructionSets[0]);
var zmin = [0,    0,     0,      0,     0,   0,     0,   0,     0,   0,     0, 234,  9, 0]
var zmax = [17, 467, 12167, 316367, 12167, 467, 12167, 467, 12167, 467, 12167, 467, 17, 0]

// printInstructionSets(instructionSets);
// executeMonad(instructionSets, "99969591111111");

type state = {
    numbers: number[],
    zs: number[]
}

// search
var part = 2;
console.time("day 24 part " + part);
var getFirstMatchingState = (state: state, instructionSets: string[][][], part: number) : state | undefined => {
    if (state.numbers.length < 4) h.print("checking: " + state.numbers.join(" ") + " _".repeat(14 - state.numbers.length));
    for (var nextState of getNextStates(state, instructionSets, part)) {
        if (nextState.numbers.length == 14) return nextState;
        else {
            var q = getFirstMatchingState(nextState, instructionSets, part);
            if (q != undefined) return q;
        }
    }
    return undefined;
}
var firstMatching = getFirstMatchingState({numbers: [], zs: [0]}, instructionSets, part);

h.print(` => ${part == 1 ? "highest" : "lowest"} matching serial number: ` + firstMatching!.numbers.join(""));
h.print(" with zs: " + JSON.stringify(firstMatching!.zs));
console.timeEnd("day 24 part " + part);