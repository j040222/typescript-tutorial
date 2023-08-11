//
// Typescript is a superset of javascript which adds static
// typing. Whereas javascript is loosely typed, typescript
// can detect mismatched types and report errors based on
// them.
//

//
// Typescript is generally compiled into javascript using
// the typescript computer, tsc. On Ubuntu the tsc compiler
// can be installed (using nodejs and npm) as follows:
//

//
// Download nodejs from https://nodejs.org/en and unpack
// it. Add the bin/ subdirectory to your PATH variable,
// for example (on Ubuntu/Debian:)
//    export PATH=$PATH:$(realpath ./node-v18.17.1-linux-x64/bin)
// Create a subdirectory called node_modules in bin/ and run
// npm as follows:
//    npm config set prefix "path/to/node_modules"
// Install the typescript compiler ('tsc') as follows:
//

// npm install -g typescript

//
// Run tsc to get the version number as follows:
//

// npx tsc --version

//
// Typescript has two main ways to assign types: implicit
// ('inference') and explicit. In explicit mode you must
// write out the type along with the declaration:
//

{

let s : string = "Hello World!";

}

//
// In implicit mode the type is not specified and tsc will
// deduce the type from the assignment:
//

{

let s = "Hello World!";             // string
// s = 42;                          // Error: assigning to a
                                    // different type is not
                                    // allowed
// s = null;                        // Assigning to null is
                                    // allowed, unless strict
                                    // null checks are enabled.

}

//
// Typescript provides an 'any' type, which disables type
// checking:
//

{

let s : any = "Hello World!";
s = 42;                             // Allowed

}

//
// tsc reads configuration options from a file named
// tsconfig.json. A simple version of this file can be
// generated using npx tsc --init. You can customize the
// behaviour of tsc for your project using the configuration
// options in tsconfig.json. If (for example) you open
// tsconfig.json in a text editor and uncomment the line
// "noImplicitAny": true, then the above 'any' keyword will
// not longer be allowed.
//

//
// There are 7 allowed primitive types in javascript. These
// are: bigint, boolean, null, number, string, symbol and
// undefined. Of these, 'boolean', 'number' and 'string' are
// the most common. By default, 'null' and 'undefined' can
// be assigned to anything. To disable this, add
// strictNullChecks:true to tsconfig.json. In this case,
// allowing null to be assigned to a variable requires
// a union type including the null keyword:
//

{

let s : string | null = "Hello World!";
s = null;                           // Allowed
// s = undefined;                   // Not allowed

}

//
// In addition to the primitive types, typescript also
// provides special types including 'unknown' and 'never'.
// 'unknown' variables can be assigned anything but cannot
// assign to anything. 'never' cannot be assigned anything.
//

{

let s : unknown = "Hello World!";
// let s1 : string = s;             // Not allowed

}

//
// Arrays can be typed as follows:
//

{

let array : string[] = [];
array.push("Hello World!");
let array2 : readonly string[] = [];
                                    // readonly - makes the
                                    // array immutable.

let array3 = [1,2,3];               // Inferred as number[]

}

//
// In typescript, a tuple is an array with heterogeneous
// types. Use the following syntax to declare the values of
// each slot in the array:
//

{

let s : [ number, null, boolean ];
s = [ 1, null, true ];

let s2 : readonly [ number, null, boolean ] =
   [ 1, null, true ];

// s2.push("Hello World!");         // Not allowed

}

//
// javascript objects can be typed as well:
//

{

let s : { first: string, second: string, third: number } =
   {
   first: "Hello",
   second: "World!",
   third: 42
   }
   ;

// s.third = "This is Mars"         // Not allowed - type
                                    // inference applies to
                                    // object properties too.

}

//
// If a property is declared in the interface, it must
// be present in the definition. To make an interface
// property optional, use ? as follows:
//

{

//
// Without ? this definition is an error:
//

let s : { first: string, second: string, third?: number };
s = { first: "Hello", second: "World!" }

}

//
// The indexes of properties can also be typed as follows:
//

{

//
// All property names must be of type string:
//

let s : { [ name : string ]: number } = { }
s.Hello = 4
s.World = 2

}

//
// In typescript an enum is a collection of named constants.
//

{

//
// A numeric enum:
//

enum Numbers {
   First = 0,                       // Numerical values can
                                    // be assigned, otherwise
                                    // they start at zero.
   Second = 1,                      
   Third = 2
}

let s : Numbers = Numbers.First;

}

{

//
// A string enum:
//

enum Numbers {
   First = "Hello",
   Second = "World",
   Third = "This is Mars"
}

let s = Numbers.First;

}

//
// Types can be defined separately from variables:
//

{

//
// Type aliases:
//

type ScalarNumber = number;
type ObjectType = { [ name : string ] : ScalarNumber }

let s : ScalarNumber = 42
let s2 : ObjectType = { 'first': s, 'second': s }

//
// Type alises can also take specific values, in which
// case instances of the type must take one such value:
//

type Integer5Or6 = 5 | 6;
let i : Integer5Or6 = 5;
// let i2 : Integer5Or6 = 7;           // Error

type String = "hello" | "world";
let str : String = "hello";
// let str2 : String = "hello world";  // Error

//
// An interface is an object type alias:
//

interface Interface0 {
   first: number,
   second: number
}

let s3 : Interface0 = { first: 4, second: 2 }

//
// Interfaces can extend one another:
//

interface Base0 {
   first : number
}
interface Derived0 extends Base0 {
   second : number
}

let s4 : Derived0 = { first: 4, second: 2 }

}

//
// Types can be cast to and from other types as follows:
//

{

let s : unknown = "Hello World!";
console.log( (s as string) );

//
// Casting does not make invalid expressions valid, but it
// can prevent TSC errors:
//

let s2 : unknown = 42;
console.log( (s2 as string).length );
                                    // Valid tsc, but prints
                                    // 'undefined' at runtime

//
// Alternative casting syntax:
//

let s3 : unknown = "Hello World!";
console.log( <string> s3 );         // "Hello World!"

}

//
// Function arguments can be typed just like variables. If
// they are, then subsequent expressions involving the
// argument are checked for validity:
//

{

function f0(object : string)
{
   //
   // If this were f(object : number), the following line
   // would be an error because number does not provide a
   // length property:
   //
   console.log(object.length)
}

//
// Named arguments can also be typed, and made optional:
//

function g0
   (
      { first, second, third } :
         { first: number, second: number, third? : number }
   )
{
   return ( first + second + ( third || 0 ) );
}

//
// varargs can be typed as arrays:
//

function h0(first : number, ...others : number[])
{
   let result = first;
   for( const other of others )
      result += other;
   return result;
}

f0("Hello world!");
g0( { first: 4, second: 2 } );
h0(1,2,3)                           // 6

}

//
// Function return values can also be typed. If a type is
// not specified then the return value is inferred based on
// the code pathways that return from the function:
//

{

function f1(x : number) : number
{
   return (x + 1);
}

function g1(x : number) : number | string
{
   if( x % 2 == 0 )
      return x;                     // number
   else
      return "Odd";                 // string
}

function h1() : void                // Doesn't return a value
{
}

console.log(f1(1))                  // 2
console.log(g1(1))                  // "Odd"

//
// A function signature:
//

type Function = (x : number) => number;
const add_one : Function = (x) => (x + 1);
console.log(add_one(1))             // 2

}

//
// Typescript verifies that all function arguments have been
// provided, unless some arguments are marked as optional:
//

{

function f2(x : number, y : number, z? : number) : number
{
   return ( x + y + (z || 0) );
}

console.log(f2(1,2,3))                 // 6

}

//
// Function declarations can be overloaded based on their
// argument types:
//

{

function f3(x : number) : number
function f3(x : string) : string
function f3(x : any) : any
{
   if( typeof x == 'string' )
      return x;
   else
      return (x + 1);
}

console.log(f3(1))                     // 1
console.log(f3("Hello World!"))        // Hello World!

}

//
// Class fields, including private fields, can also be
// assigned types. In addition, typescript provides
// c++-style 'private', 'protected' and 'public' visibility
// modifiers:
//

{

class Class0 {
   field_ : number = 1;
   #private_field_ : string = "Hello World!";
   private private_field2_ : string = "This is Mars";
   public constructor()
   {
   }
   public get field() : number
   {
      return this.field_;
   }
}

let c = new Class0();

}

{

//
// Adding visibility modifiers to constructor arguments
// automatically creates instance properties with the same
// name:
//

class Class1 {
   public constructor(private name_ : string) { }
   public get name() : string
   {
      return this.name_;
   }
}

let c = new Class1("Hello World!");
console.log(c.name);                // "Hello World!"

}

//
// Typescript provides similar functionality to the c++
// 'const' keyword for class members using the 'readonly'
// keyword:
//

{

class Class2 {
   private readonly name_ : string;
   public constructor(name : string)
   {
      //
      // name_ cannot be assigned after this initial
      // definition:
      //
      this.name_ = name;
   }
}

}

//
// Classes can implement interfaces, can extend one
// another (using single inheritance), can override base
// class methods, and can be abstract (can contain
// unimplemented methods) as follows:
//

{

interface Interface3
{
   get_name: () => string;
}

//
// An abstract implementation of Interface3:
//

abstract class Class3a implements Interface3
{
   public abstract get_name() : string;
}

//
// A concrete implementation of Interface3:
//

class Class3b extends Class3a
{
   public constructor(protected name_ : string)
   {
      super();
   }
   
   public get_name() : string
   {
      return this.name_;
   }
}

class Class3c extends Class3b
{
   public constructor()
   {
      //
      // Use super() to invoke the base class constructor:
      //
      super("Hello World!");
   }
   
   //
   // An override for a base class method:
   //
   
   public override get_name() : string
   {
      return this.name_;
   }
}

let c = new Class3c();
console.log(c);                     // Class3c { name_: 'Hello World!' }

}

//
// Typescript classes can be "templated" in ways that are
// similar to C++. The templated type parameters are
// specified in angle brackets <> after the class name.
// Templated types are called 'generics'.
//

{

class Class4a<T> {
   public constructor(private value_ : T) { }
   public get value() : T { return this.value_; }
   public set value(value : T) { this.value_ = value; }
}

let c = new Class4a<number>(42);
console.log(c.value)                // 42

c = new Class4a(42);                // T=number can be inferred
                                    // for constructors
console.log(c.value)                // 42

//
// Type aliases can also be generic:
//

type Object<T> = { value : T };
let c2 : Object<number> = { value: 42 };

//
// Class generics can be assigned default values:
//

class Class4b<T = string> { }

//
// Function arguments can also be made generic:
//

function f4a<T> (x : T) : T { return x; }
console.log(f4a(1))                  // Inferred as f<number>(1)

//
// Generic types can also be constrained using 'extends',
// which limited their generality:
//

function f4b<T extends number> (x : T) { return (x + 1); }
console.log(f4b(1))                  // Inferred as f<number>(1)

}

//
// Typescript includes many 'utility types' that perform
// special type manipulations. For example:
//

{

//
// Get the provision type of a Promise:
//

type A = Awaited<Promise<number | string>>;
                                    // number | string

//
// Construct a type with all properties set to optional:
//

interface Interface5a {
   first: string,
   second: string
}

let a : Partial<Interface5a> = { first: "Hello World!" };
                                    // Both properties are optional

//
// Construct a type with all properties set to non-optional:
//

interface Interface5b {
   first?: string,
   second?: string
}

let b : Required<Interface5a> =     // All properties are required
   {
      first: "Hello",
      second: "World!"
   }
   ;

//
// Constructs a type with all properties set to readonly:
//

let c : Readonly<Interface5a> =     // All properties are required
   {
      first: "Hello",
      second: "World!"
   }
   ;

// c.first = "Reassigned";          // Cannot assign to 'first'
                                    // because it is a read-only
                                    // property.


//
// Constructs an object with specific keys all of which have
// specific type values:
//

interface Interface5b
{
   name: string
}

let d : Record< "first" | "second", Interface5b> =
   {
   first: { name: "Hello" },
   second: { name: "World!" }
   }
   ;

//
// Extract some properties from a type:
//

type E = Pick<Interface5a, "first">;

let e : E = { first: "Hello World!" };

//
// Remove (omit) some properties from a type:
//

type F = Omit<Interface5a, "first">;

let f : F = { second: "Hello World!" };

//
// Exclude a type from a union of other types:
//

type G1 = number | ( () => void );
type G2 = Exclude<G1, Function>;
let g : G2 = 42;
// let g2 : G2 = () => {};       // Error: function type is
                                 // not assignable to number

//
// Extract a type from a union of other types:
//

type H1 = number | ( () => void );
type H2 = Extract<G1, Function>;

let h : H2 = () => {};

//
// Exclude null and undefined from a union type:
//

type I1 = number | null | undefined;
type I2 = NonNullable<I1>;

let i : I2 = 42;

//
// Get the parameter types of a function, as an array:
//

type J1 = Parameters<(arg : { first: string }) => void>;

let j1 : J1 = [ { first : "Hello World!" } ];

//
// Get class constructor arguments, as an array:
//

class Class5a {
   name_ : string;
   public constructor(name : string)
   {
      this.name_ = name;
   }
}

type K1 = ConstructorParameters<typeof Class5a>;

let k1 : K1 = [ "Hello World!" ];

//
// Get the return type of a function:
//

function f5a() : number { return 1; }

type L1 = ReturnType<typeof f5a>;   // number

//
// Extract and omit a function argument named 'this':
//

function f5b(this : number) : number { return this; }

type M1 = ThisParameterType<typeof f5b>;
let m1 : M1 = 42;

type M2 = OmitThisParameter<typeof f5b>;
let m2 : M2 = () => { return 1; };

//
// String manipulation functions:
//

type N1 = Uppercase<"Hello World!">;
let n1 : N1 = "HELLO WORLD!";

type N2 = Lowercase<"Hello World!">;
let n2 : N2 = "hello world!";

type N3 = Capitalize<"hello world!">;
let n3 : N3 = "Hello world!";

type N4 = Uncapitalize<"Hello World!">;
let n4 : N4 = "hello World!";

}

//
// If an object has explicit keys, keyof creates the type
// that is the union of those keys (as strings):
//

{

interface interface6a {
   first : string;
   second : string;
}
function f6a(arg : keyof interface6a)
{
   console.log(arg);
}

f6a("first");
f6a("second");
// f6a("third");                    // Error: no such key in
                                    // interface6a

//
// If a type has an index signature, keyof extracts the type
// of the index:
//

interface interface6b {
   [ key : string ]: unknown
}
function f6b(arg : keyof interface6b)
{
   console.log(arg);
}

f6b("third");                       // Accepts any string

}

//
// When expanding an optional property in a dot chain
// (eg. object.first.second), use ? to cover the possibility
// that a property is missing. If the property is missing,
// the expression evaluates to 'undefined'.
//

{

interface interface7a {
   first?: { second : number }
}
function f7a(arg : interface7a)
{
   console.log(arg.first?.second);
}
f7a( { first: { second: 42 } } )
f7a( { } )

function f7b() : string | undefined
{
   return "Hello World!";
}
let a : string | undefined = f7b();
let b : number = a!.length;         // Assert that a is not null/
                                    // undefined. If strictNullChecks=
                                    // false, it is an error not to
                                    // do so here.

}



