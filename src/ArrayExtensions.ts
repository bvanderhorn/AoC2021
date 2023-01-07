export {}
declare global {
    interface Array<T>  {
        sum(): number;
        prod(): number;
        sum0(): number[];
        sum1(): number[];
        prod0(): number[];
        prod1(): number[];
        tonum(): any[];
        sortnum(): number[];
        range(start:number): number[];
        range(): number[];
        col(column:number): any[];
        times(t: number) : any[];
        plus(p:number) : any[];
        count(element:any): number;
        includesAll(array: any[]) : boolean;
        includes2(array: any[]) : boolean;
        last(): any;
        min(): number;
        max(): number;
        split(str:(string|RegExp)): any[][];
        trim() : any[];
        copy() : any[];
        unique(): any[];
	at(name:any): any;
    }
}

if(!Array.prototype.at) {
	// return element [1] of subarray where [0] equals input
	Object.defineProperty(Array.prototype, 'at', {
	enumerable: false,
	writable:false,
	configurable: false,
	value: function at(this: any[][], name: any) : any {
	return this[this.col(0).indexOf(name)][1];
	}
});
}


if (!Array.prototype.unique) {
    // return a new array containing all distinct values in the original one
    Object.defineProperty(Array.prototype, 'unique', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function unique(this: any[]): any[] {
            var newArray:any[] = Array(this.length).fill(undefined);
            var index = 0;
            for (let i=0;i<this.length;i++) {
                if (!newArray.includes2(this[i])) {
                    newArray[index] = this[i];
                    index++;
                }
            }
            return newArray.slice(0,index);
        }
    });
}

if (!Array.prototype.copy) {
    // return a deep copy of the array using JSON parse/stringify
    Object.defineProperty(Array.prototype, 'copy', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function copy(this: any[]): any[] {
            return JSON.parse(JSON.stringify(this));
        }
    });
}

if (!Array.prototype.split) {
    // split all string sub elements recursively
    Object.defineProperty(Array.prototype, 'split', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function split(this: any[],str:(string|RegExp)): any[][] {
            return this.map(el => el.split(str));
        }
    });
}

if (!Array.prototype.tonum) {
    // cast all elements to int recursively
    Object.defineProperty(Array.prototype, 'tonum', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function tonum(this: any[]): any[] {
            return this.map(str => typeof str == 'string' ? +str : str.tonum());
        }
    });
}

if (!Array.prototype.trim) {
    /// trim all string elements recursively
    Object.defineProperty(Array.prototype, 'trim', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function trim(this: any[]): any[] {
            return this.map(str => str.trim());
        }
    });
}

if (!Array.prototype.sortnum) {
    // sort number array ascending
    Object.defineProperty(Array.prototype, 'sortnum', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sortnum(this: number[]): number[] {
            return this.sort((a,b) => a-b);
        }
    });
}

if (!Array.prototype.min) {
    // minimum of all array elements
    Object.defineProperty(Array.prototype, 'min', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function min(this: number[]): number {
            return Math.min(...this);
        }
    });
}

if (!Array.prototype.max) {
    // maximum of all array elements
    Object.defineProperty(Array.prototype, 'max', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function max(this: number[]): number {
            return Math.max(...this);
        }
    });
}

if (!Array.prototype.col) {
    // column of array with sub arrays at given X position
    Object.defineProperty(Array.prototype, 'col', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function col(this: any[][], column:number): any[] {
            return this.map(el => el[column]);
        }
    });
}

if (!Array.prototype.times) {
    // multiply each element with a scalar value (recursively)
    Object.defineProperty(Array.prototype, 'times', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function times(this: any[], t:number): any[] {
            return this.map(el => (typeof el === "number") ? el * t : el.times(t));
        }
    });
}

if (!Array.prototype.plus) {
    // add a scalar value to each element (recursively)
    Object.defineProperty(Array.prototype, 'plus', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function plus(this: any[], p:number): any[] {
            return this.map(el => ["string","number"].includes(typeof el) ? el + p : el.plus(p));
        }
    });
}

if (!Array.prototype.count) {
    // count of all occurrences of element in array
    Object.defineProperty(Array.prototype, 'count', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function count(this: any[], element:any): number {
            return this.reduce(function(n, val) {
                return n + (val === element);
            }, 0);
        }
    });
}

if (!Array.prototype.includes2) {
    // check if array includes a complete given array as a sub-array
    Object.defineProperty(Array.prototype, 'includes2', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function includes2(this: any[][], array:any[]): boolean {
            return contains(this, array);
        }
    });
}

if (!Array.prototype.includesAll) {
    // check if array includes all elements of second array
    Object.defineProperty(Array.prototype, 'includesAll', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function includesAll(this: any[], array:any[]): boolean {
            return array.every(v => this.includes2(v));
        }
    });
}

if (!Array.prototype.range) {
    Object.defineProperty(Array.prototype, 'range', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function range(this: any[],start:number = 0): number[] {
            return Array.from({length: (this.length - start)}, (v, k) => k + start);
        }
    });
}

if (!Array.prototype.last) {
    // last element of array
    Object.defineProperty(Array.prototype, 'last', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function last(this: any[]): any {
            return this[this.length -1];
        }
    });
}

if (!Array.prototype.sum) {
    // sum of all array elements
    Object.defineProperty(Array.prototype, 'sum', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum(this: number[]): number {
            return this.reduce((a:number,b:number) => a+b, 0);
        }
    });
}

if (!Array.prototype.sum0) {
    // piece-wise sum of sub-array elements in primary (Y) direction
    Object.defineProperty(Array.prototype, 'sum0', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum0(this:number[][] ): number[] {
            return apply0(this, 'sum');
        }
    });
}

if (!Array.prototype.prod0) {
    // piece-wise product of sub-array elements in primary (Y) direction
    Object.defineProperty(Array.prototype, 'prod0', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod0(this:number[][] ): number[] {
            return apply0(this, 'prod');
        }
    });
}

if (!Array.prototype.prod1) {
    // products of all elements within each sub-array (in secondary (X) direction)
    Object.defineProperty(Array.prototype, 'prod1', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod1(this:number[][] ): number[] {
            return apply1(this, 'prod');
        }
    });
}

if (!Array.prototype.sum1) {
    // sum of elements of each sub-array (i.e., sum in secondary (X) direction)
    Object.defineProperty(Array.prototype, 'sum1', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sum1(this: number[][]): number[] {
            return apply1(this, 'sum');
        }
    });
}

if (!Array.prototype.prod) {
    // multiplication of all array elements
    Object.defineProperty(Array.prototype, 'prod', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function prod(this: number[]): number {
            return this.reduce((a:number,b:number) => a*b);
        }
    });
}

export function apply0(array: number[][],operation:string) : number[] {
    return array[0].map((el:number,i:number) => {
        let verticalSlice = array.slice(1).map(c => c[i]);
        if (operation === 'sum') return el + verticalSlice.sum();
        else return el * verticalSlice.prod();
    });
}

export function apply1(array: number[][], operation:string) : number[] {
    return array.map(el => {
        if (operation == 'sum') return el.sum();
        else return el.prod();
    });
}

export function equals2(first: any, second: any): boolean {
    var [fa, sa] = [Array.isArray(first),Array.isArray(second)];
    if (!fa && !sa) return first === second;
    if (fa && sa){
        if (first.length != second.length) return false;
        for (let i=0;i<first.length;i++) if (!equals2(first[i],second[i])) return false;
        return true;
    }
    return false;
}

export function contains(array: any[], element: any): boolean {
    return array.filter(el => equals2(el, element)).length >= 1;
}
