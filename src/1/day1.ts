import * as h from "../helpers";

// params
var inputFile = 'sweep.txt';

// parse
var input = h.read(1,inputFile,'toint');
h.print(input.slice(0,10));

// part 1
var incr = input.slice(1).map((el,i) => (el > input[i]) ? "1" : "0").reduce((a,b) => +a + +b, 0);
h.print(incr);

// part 2
var sumList = input.slice(2).map((el, i) => input[i] + input[i+1] + el);
var incrSum = sumList.slice(1).map((el, i) => (el > sumList[i]) ? "1" : "0").reduce((a, b) => +a + +b, 0);
h.print(incrSum);