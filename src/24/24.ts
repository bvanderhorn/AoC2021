import * as h from '../helpers';

// helpers
var execute = (instruction: string[], state: number[], input: number) : void {
    let [w, x ,y, z] = state;
    var operator = {add:"+", mul:"*", mod:"%", div:"/", eql:'==='};

    if (instruction[0] == 'inp') eval(`${instruction[1]} = ${input}`);
    else eval(`${instruction[1]} = ${instruction[1]} ${operator[instruction[0]]} ${instruction[2]}`);
    
    state = [w, x, y, z];
}

var instructions = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
h.print(instructions[0]);

