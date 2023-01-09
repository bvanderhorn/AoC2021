import { Http2ServerRequest } from "http2";
import * as h from "../helpers";
var hex2bin = (hex:string): string => parseInt(hex, 16).toString(2);
var packet = h.read(16,'packet.txt','ex');
var bin = packet.map(p => hex2bin(p));
h.print(bin);

h.print([1,2,3,[4,5]].mape(x => x*2));
h.print([[1,2,[3,4]],5].join(''));