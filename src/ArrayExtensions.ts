export {}
declare global {
    interface Array<T>  {
        sum(): number;
        prod(): number;
        sum0(): number[];
        sum1(): number[];
        prod0(): number[];
        prod1(): number[];
        toInt(): number[];
        sortInt(): number[];
        range(start:number): number[];
        range(): number[];
        col(column:number): any[];
        times(t: number) : any[];
        plus(p:number) : any[];
        count(element:any): number;
        includesAll(array: any[]) : boolean;
        last(): any;
        min(): number;
        max(): number;
    }
}

if (!Array.prototype.toInt) {
    // cast all elements to int
    Object.defineProperty(Array.prototype, 'toInt', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function toInt(this: string[]): number[] {
            return this.map(str => +str);
        }
    });
}

if (!Array.prototype.sortInt) {
    // sort number array ascending
    Object.defineProperty(Array.prototype, 'sortInt', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function sortInt(this: number[]): number[] {
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

if (!Array.prototype.includesAll) {
    // check if array includes all elements of second array
    Object.defineProperty(Array.prototype, 'includesAll', {
        enumerable: false, 
        writable: false, 
        configurable: false, 
        value: function includesAll(this: any[], array:any[]): boolean {
            return array.every(v => this.includes(v));
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