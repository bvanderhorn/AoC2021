import * as h from "../helpers";
var nofIncreases = (array1:number[]) : number => array1.slice(1).map((el,i) => (el > array1[i]) ? 1 : 0).sum();
var input = h.read(1,'sweep.txt','toint');
h.print(nofIncreases(input));
h.print(nofIncreases( input.slice(2).map((el, i) => input[i] + input[i+1] + el) ));