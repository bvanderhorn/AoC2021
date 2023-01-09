import * as h from "../helpers";
type packet = {v: number, t: number, i:number, nsb:number, nsp:number, subbits:string, litvalue:number, children:packet[]};
var getnextpacket = (bin:string) : [packet, string] => {
    var [v,t, rem] = [parseInt(bin.slice(0,3),2), parseInt(bin.slice(3,6),2), bin.slice(6)];
    var [i,nsb, nsp, subbits, lstr, litvalue, remstring] = [-1,-1,-1,'','',-1,''];
    var children:packet[] = [];
    if (t===4) {
        var lv:string[] = [];
        while(true) {
            let x = rem.slice(0,5);
            rem = rem.slice(5);
            lv.push(x.slice(1));
            if (x[0] === '0') break;
        }
        litvalue = parseInt(lv.join(''),2); 
    } else {
        i = +rem[0];
        if (i===0) {
            nsb = parseInt(rem.slice(1,16),2);
            subbits = rem.slice(16,16+nsb);
            rem = rem.slice(16+nsb);
            var remsub = ""+subbits;
            while(remsub.length > 0) {
                let [child, newremsub] = getnextpacket(remsub);
                remsub = newremsub;
                children.push(child);
            }
        } else {
            nsp = parseInt(rem.slice(1,12),2);
            rem = rem.slice(12);
            for (const p in h.range(0,nsp)) {
                let child: packet;
                [child,rem] = getnextpacket(rem);
                children.push(child);
            }
        }
    }
    return [{v:v, t:t, i:i, nsb:nsb, nsp:nsp, subbits:subbits, litvalue:litvalue, children:children}, rem];
}
var hex2bin = (hex:string): string => hex.split('').map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('');
var versionsum = (pack:packet) : number => pack.v + pack.children.map(c => versionsum(c)).sum();
var ipacket = h.read(16,'packet.txt');
var bin = ipacket.map(p => hex2bin(p));
var packs = bin.map(b => getnextpacket(b)).col(0);
h.print(ipacket);
// h.print(h.stringify(packs[3]));
h.print('part 1: sum of versions: ',packs.map(p => versionsum(p)));