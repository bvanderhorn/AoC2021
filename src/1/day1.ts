import * as h from "../helpers";

// params
var inputFile = 'sweep.txt';

// parse
var input = h.read(1,inputFile,'toint|ex');
h.print(input.slice(0,10));
var incr = input.slice(1).map((el,i) => (el > input[i]) ? "1" : "0").reduce((a,b) => +a + +b, 0);
h.print(incr);