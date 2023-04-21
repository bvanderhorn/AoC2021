import * as h from '../helpers';
// helpers
var executeInstruction = (instruction: string[], state: number[], input: number) : void => {
    let [w, x ,y, z] = state;
    var operator = ["+","*", "%", "/", '==='];
    var command = ["add", "mul", "mod", "div", "eql"];

    var executionString = "";
    if (instruction[0] == 'inp') executionString = `${instruction[1]} = ${input}`;
    else executionString = `${instruction[1]} = Math.floor(+(${instruction[1]} ${operator[command.findIndex(x => x==instruction[0])]} ${instruction[2]}))`;
    
    h.print(" executing: " + instruction.join(" ") + " => " + executionString + " => " + eval(executionString));

    state[0] = w;
    state[1] = x;
    state[2] = y;
    state[3] = z;
}
var executeInstructionSet = (instructions: string[][], input: number, state: number[] = [0,0,0,0]) : number[] => {
    instructions.forEach(x => executeInstruction(x, state, input));
    h.print(state);
    return state;
}
var executeMonad = (instructionSets: string[][][], input: string, state: number[] = [0,0,0,0]) : number[] => {
    instructionSets.forEach((x,i) => {
        executeInstructionSet(x, +input[i], state);
    });
    return state;
}
var printInstructionSets = (instructionSets: string[][][]) : void => {
    var columnWidth = 10;
    var str = h.range(0, instructionSets.length).map(x => "# " + x + " ".repeat(columnWidth - ("# " + x).length)).join("") + "\n";
    str += instructionSets[0].map((_,i) => instructionSets.map(x => x[i].join(" ") + " ".repeat(columnWidth -1 - x[i].join(" ").length)).join(" ")).join("\n");
    h.write(24, "instructionsets.txt", str);
}

var instructionSets = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
h.print(instructionSets[0]);

// var state = [0,0,0,0];
// executeInstruction(["add", "w", "1"], state, 0);
// h.print(executeInstructionSet(instructionSets[0], 9));
h.print(executeMonad(instructionSets, "13579246899999"))
printInstructionSets(instructionSets);
