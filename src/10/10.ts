import * as h from "../helpers";
var syntax = h.read(10,'syntax.txt');
var [open, close, score] = ['([{<', ')]}>', [3,57,1197,25137]];
var scores = syntax.map(s => {
    let opens : string[] = [];
    for (const i of h.range(0,s.length)) {
        if (open.includes(s[i])) opens.push(s[i]);
        else if (close.indexOf(s[i]) == open.indexOf(opens.last())) opens.pop(); 
        else return score[close.indexOf(s[i])];
    }
    return 0;
});
h.print('part 1: sum of syntax error scores: ',scores.sum());