import * as h from '../helpers';
// helpers
var executeInstruction = (instruction: string[], state: number[], input: number) : void => {
    let [w, x ,y, z] = state;
    var operator = ["+","*", "%", "/", '==='];
    var command = ["add", "mul", "mod", "div", "eql"];

    var executionString = "";
    if (instruction[0] == 'inp') executionString = `${instruction[1]} = ${input}`;
    else executionString = `${instruction[1]} = +(${instruction[1]} ${operator[command.findIndex(x => x==instruction[0])]} ${instruction[2]})`;
    
    h.print(" executiong: " + executionString);
    eval(executionString);

    state[0] = w;
    state[1] = x;
    state[2] = y;
    state[3] = z;
}
var executeInstructionSet = (instructions: string[][], state: number[], input: number) : void => {
    instructions.forEach(x => executeInstruction(x, state, input));
}

var instructionSets = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
h.print(instructionSets[0]);

var state = [0,0,0,0];
// executeInstruction(["add", "w", "1"], state, 0);
executeInstructionSet(instructionSets[0], state, 1);
h.print(state);