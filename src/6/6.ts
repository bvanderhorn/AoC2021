import * as h from "../helpers";
var toFishBuckets = (fish:number[]) : number[] => h.rangee(0,9).map(x => fish.count(x));
var fishAfterDaysDetailed = (fish:number,days:number): number[] =>  (days <= fish) ? [fish-days] : (fishAfterDaysDetailed(8,days-fish-1).concat(fishAfterDaysDetailed(6,days-fish-1)));
var fishAfterDays = (fish:number,days:number): number =>  (days <= fish) ? 1 : (fishAfterDays(8,days-fish-1) + fishAfterDays(6,days-fish-1));
var fishBucketsAfterDays = (fish:number,days:number): number[] => toFishBuckets(fishAfterDaysDetailed(fish,days));
var eachBucketAfterDays = (days:number) : number[][] => h.rangee(0,9).map(f => fishBucketsAfterDays(f,days));
var fbCombineWithEachBucketAfterDays = (fb:number[], eachBucket:number[][]) : number[] =>  h.rangee(0,9).map(f => eachBucket[f].map( fe => fe * fb[f])).sum0();

var fish = h.read(6,'fish.txt')[0].split(',').toInt();
h.print(toFishBuckets(fish));

// part 1
var fad = h.rangee(0,7).map(f => fishAfterDays(f,80));
h.print('number of lantern fish after 80 days:  ',fish.map((f:number) => fad[f]).sum());

// part 2
var fb = toFishBuckets(fish);
for (const i of h.rangee(1,5)) fb = fbCombineWithEachBucketAfterDays(fb, eachBucketAfterDays(64));
h.print('number of lantern fish after 256 days: ',fb.sum());