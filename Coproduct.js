// @flow

/*
 * Right now there's only one way to do a mass coproduct: $Keys
 *
 * $Keys takes an Object, and returns a coproduct of the keys
 *
 */

type ExtractKey<K> = <A>(A) => K
declare function mirrorKey<O>(object: O): $ObjMap<O, ExtractKey<$Keys<O>>>;

(mirrorKey({foo: 1}): {foo: 'foo'});
// (mirrorKey({foo: 2}): {foo: 'bar'});
(mirrorKey({foo: 2, bar: 1}): {foo: 'foo' | 'bar', bar: 'foo' | 'bar'});
