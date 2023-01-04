import * as h from "../helpers";
var fishAfterDays = (fish:number,days:number): number[] =>  (days <= fish) ? [fish-days] : (fishAfterDays(8,days-fish-1).concat(fishAfterDays(6,days-fish-1)));
var fish = h.read(6,'fish.txt')[0].split(',').toInt();
h.print(fish.slice(0,5));

// part 1
var days = 80;
var fad = h.rangee(0,7).map(f => fishAfterDays(f,days));
var newFish = fish.map((f:number) => fad[f]).flat();
h.print('number of lantern fish after ',days, ' days: ',newFish.length);