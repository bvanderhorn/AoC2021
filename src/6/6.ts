import * as h from "../helpers";
var toBuckets             = (fish:number[])          : number[] => h.range(0,9).map(x => fish.count(x));
var fishAfterDays         = (fish:number,days:number): number   => (days <= fish) ? 1 :           (fishAfterDays(8,days-fish-1)        + fishAfterDays(6,days-fish-1));
var fishAfterDaysDetailed = (fish:number,days:number): number[] => (days <= fish) ? [fish-days] : (fishAfterDaysDetailed(8,days-fish-1).concat(fishAfterDaysDetailed(6,days-fish-1)));
var fishBucketsAfterDays  = (fish:number,days:number): number[] => toBuckets(fishAfterDaysDetailed(fish,days));
var eachBucketAfterDays   = (days:number)            : number[][] => h.range(0,9).map(f => fishBucketsAfterDays(f,days));
var addBuckets = (curBucket:number[], addEachBucket:number[][]) : number[] =>  h.range(0,9).map(f => addEachBucket[f].times(curBucket[f])).sum0();

var fish = h.read(6,'fish.txt')[0].split(',').toInt();

// part 1
var fad = h.range(0,7).map(f => fishAfterDays(f,80));
h.print('number of lantern fish after 80 days:  ',fish.map((f:number) => fad[f]).sum());

// part 2
var fb = toBuckets(fish);
var eb64 = eachBucketAfterDays(64);
for (let i=0;i<4;i++) fb = addBuckets(fb, eb64);
h.print('number of lantern fish after 256 days: ',fb.sum());