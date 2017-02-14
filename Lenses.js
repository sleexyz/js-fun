// @flow

/*
 * A "Selector" is simply a read lens
 *
 * The following is an attempt to encodeRead/Write lenses
 *
 *
 * TODO:
 * - recursive makeLenses?
 * - immutableJS + flowtype? That might subsume my need for custom lenses
 *
 */

import { assert } from 'chai';

type Lens<S, T> = {
  getter: S => T,
  setter: (T => T) => S => S,
};

type $ToLens<S> = <T>(v: T) => Lens<S, T>;


const makeLenses = <S: {}>(obj: S): $ObjMap<S, $ToLens<S>> => {
  const keys = Object.keys(obj);
  const lensDict = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const lens = {
      getter: (obj) => obj[key],
      setter: (f) => (obj) => ({ ...obj, [key]: f(obj[key]) }),
    };
    lensDict[key] = lens;
  }
  return lensDict;
};


declare function compose<S, T, U>(x: Lens<S, T>, y: Lens<T, U>): Lens<S, U>;

describe("lenses", () => {
  describe("makeLenses", () => {
    it("getter works", () => {
      const state = {
        todos: [
          { value: "helllo", id: 0 },
        ],
        nextId: 1,
      };
      const lenses = makeLenses(state);
      () => {
        // $ExpectError
        lenses.asdf;
        // $ExpectError
        lenses.nextId("hello");
      }
      assert.equal(lenses.nextId.getter(state), 1);
    });

    it("setter works", () => {
      const state = {
        todos: [
          { value: "helllo", id: 0 },
        ],
        nextId: 1,
      };
      const lenses = makeLenses(state);
      const incr = (x) => x + 1;
      const newState = lenses.nextId.setter(incr)(state);
      assert.equal(lenses.nextId.getter(newState), 2);
    });
  });
});
