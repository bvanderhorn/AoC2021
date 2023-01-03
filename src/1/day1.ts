import * as h from "../helpers";

// functions
var nofIncreases = (array1:number[]) : number => array1.slice(1).map((el,i) => (el > array1[i]) ? 1 : 0).sum();

// parse
var input = h.read(1,'sweep.txt','toint');
h.print(input.slice(0,10));

// part 1
h.print(nofIncreases(input));

// part 2
var sumList = input.slice(2).map((el, i) => input[i] + input[i+1] + el);
h.print(nofIncreases(sumList));