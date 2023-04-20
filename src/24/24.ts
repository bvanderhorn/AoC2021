import * as h from '../helpers';

var instructions = h.read(24,'monad.txt').split(" ");
h.print(instructions.slice(0,3));
