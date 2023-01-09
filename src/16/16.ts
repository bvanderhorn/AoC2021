import * as h from "../helpers";
type packet = {v: number, t: number, i:number, nsb:number, nsp:number, subbits:string, parent: number, lstr:string, litvalue:number}
var getpacket = (bin:string, parent:number) : packet => {
    var [v,t, rem] = [parseInt(bin.slice(0,3),2), parseInt(bin.slice(3,6),2), bin.slice(6)];
    var [i,nsb, nsp, subbits, lstr, litvalue] = [-1,-1,-1,'','',-1];
    if (t===4) {
        var lv:string[] = [];
        while(true) {
            let x = rem.slice(0,5);
            rem = rem.slice(5);
            lv.push(x.slice(1));
            if (x[0] === '0') break;
        }
        lstr= lv.join('');
        litvalue = parseInt(lstr,2);
    } else {
        i = +rem[0];
        if (i===0) {
            nsb = parseInt(rem.slice(1,16),2);
            subbits = rem.slice(16,16+nsb);
        } else {
            nsp = parseInt(rem.slice(1,12),2);
            subbits = rem.slice(12);
        }
    }
    return {v:v, t:t, i:i, nsb:nsb, nsp:nsp, subbits:subbits, parent:parent, lstr:lstr, litvalue:litvalue};
}
var hex2bin = (hex:string): string => hex.split('').map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('');
var ipacket = h.read(16,'packet.txt','ex');
var bin = ipacket.map(p => hex2bin(p));
h.print(ipacket);
h.print(bin);
h.print(h.stringify(getpacket(bin[1], -1)));