import * as h from "../helpers";
var acScore = (ac:string) : number => {
    var score = 0;
    for (let j=0; j<ac.length;j++) score = score*5 + close.indexOf(ac[j]) + 1;
    return score;
}
var syntax = h.read(10,'syntax.txt');
var [open, close, score] = ['([{<', ')]}>', [3,57,1197,25137]];
var errorsCompletions : (number | string)[] = syntax.map(s => {
    let opens : string[] = [];
    for (const i of h.range(0,s.length)) {
        if (open.includes(s[i])) opens.push(s[i]);
        else if (close.indexOf(s[i]) == open.indexOf(opens.last())) opens.pop(); 
        else return score[close.indexOf(s[i])];
    }
    return (opens.length > 0) ? opens.map(c => close[open.indexOf(c)]).reverse().join('') : 0;
});
h.print('part 1: sum of syntax error scores: ',errorsCompletions.filter(ec => typeof ec == 'number').sum());
var acScores = errorsCompletions.filter(ec => typeof ec == 'string').map(s => acScore(s)).sortnum();
h.print('part 2: middle score: ',acScores[(acScores.length-1)/2]);