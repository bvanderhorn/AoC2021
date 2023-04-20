import * as h from '../helpers';
// helpers
var executeInstruction = (instruction: string[], state: number[], input: number) : void => {
    let [w, x ,y, z] = state;
    var operator = ["+","*", "%", "/", '==='];
    var command = ["add", "mul", "mod", "div", "eql"];

    var executionString = "";
    if (instruction[0] == 'inp') executionString = `${instruction[1]} = ${input}`;
    else executionString = `${instruction[1]} = +(${instruction[1]} ${operator[command.findIndex(x => x==instruction[0])]} ${instruction[2]})`;
    
    // h.print(" executiong: " + executionString);
    eval(executionString);

    state[0] = w;
    state[1] = x;
    state[2] = y;
    state[3] = z;
}
var executeInstructionSet = (instructions: string[][], input: number, state: number[] = [0,0,0,0]) : number[] => {
    instructions.forEach(x => executeInstruction(x, state, input));
    return state;
}
var executeMonad = (instructionSets: string[][][], input: string) : number => {
    var result = "";
    instructionSets.forEach((x,i) => {
        result += executeInstructionSet(x, +input[i])[3];
    });
    return +result;
}

var instructionSets = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
h.print(instructionSets[0]);

// var state = [0,0,0,0];
// executeInstruction(["add", "w", "1"], state, 0);
h.print(executeInstructionSet(instructionSets[0], 1));
h.print(executeMonad(instructionSets, "13579246899999"));