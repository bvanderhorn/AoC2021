import * as h from "../helpers";
var hex2bin = (hex:string): string => (parseInt(hex, 16).toString(2));
var packet = h.read(16,'packet.txt');
h.print(hex2bin('D2FE28'));