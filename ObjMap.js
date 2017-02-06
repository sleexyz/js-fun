// @flow


/*
 * ObjMap take an Object Type, and a Function Type, and applies the
 * function type to all fields of the object to derive a new Object type.
 */


type ExtractFoo = <V>(v: {foo: V}) => V;
declare function extractFoo<O: Object>(obj: O): $ObjMap<O, ExtractFoo>;
(extractFoo({asdf: {foo: "hello"}}): {asdf: string});
// (extractFoo({asdf: {foo: 1}}): {asdf: string}); // doesn't typecheck

type ExtractAction = <A>(reducer: (any, A) => any) => A;
declare function extractAction<O: Object>(obj: O): $ObjMap<O, ExtractAction>;

type ExtractHeadType = <A>(v: [A, any]) => A;
declare function extractHead<O: Object>(obj: O): $ObjMap<O, ExtractHeadType>;
(extractHead({ foo: ["hello", 1]}): {foo: string});
// (extractHead({ foo: ["hello", 1]}): {foo: number});


type SwapTup = <A, B>(v: [A, B]) => [B, A];
declare function swapTup<O: Object>(obj: O): $ObjMap<O, SwapTup>;
(swapTup({ foo: ["hello", 1]}): {foo: [1, "hello"]});
(swapTup({ foo: ["hello", 1]}): {foo: [number, string]});
// (swapTup({ foo: ["hello", 1]}): {foo: [string, number]});



