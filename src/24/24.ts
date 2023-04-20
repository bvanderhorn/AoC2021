import * as h from '../helpers';
// helpers
var execute = (instruction: string[], state: number[], input: number) : void {
    let [w, x ,y, z] = state;
    
    switch (instruction[0]) {
        case 'inp' : eval(instruction[1]+ " = " + input); break;
    }

    state = [w, x, y, z];
}

var instructions = h.simpleRead(24,'monad.txt').split(/inp/).filter(x => x!= "").map(x => "inp" + x).split(/\r?\n/).map(x => x.filter(l => l != '')).split(" ");
h.print(instructions[0]);

