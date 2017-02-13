// @flow

// Naive Typesafe immutable records, take 2
// This time we omit the `children` nonsens
//
// TODO: lets try for a constant time set

import { assert } from 'chai';

type LensMethods<S, T> = {
  get: () => T,
  set: (T => T) => S,
};

type $ToLensMethods<S> = <T>(v: T) => LensMethods<S, T>;

type $Record<S> = $ObjMap<S, $ToLensMethods<$Record<S>>>;

const Record = {
  fromJS: <S: {}>(obj: S): $Record<S> => {
    const rec = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      rec[key] = {
        get: () => obj[key],
        set: (f): $Record<S> => Record.fromJS({ ...obj, [key]: f(obj[key]) }),
      };
    }
    return rec;
  },
  toJS: <S: {}>(rec: $Record<S>): S => {
    const obj =  {};
    const keys = Object.keys(rec);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      obj[key] = rec[key].get();
    }
    // $ExpectError
    return obj;
  }
};


// flowtype test
() => {
  const state = Record.fromJS({
    foo: "hello",
    bar: 1,
  });
  // Correct
  state.foo.get();
  // Correct
  state.foo.set((x) => x + " world")
  // Correct
  state
    .foo.set((x) => x + " world")
    .foo.set((x) => x + " world");
  // $ExpectError
  state.foo.set();
  // $ExpectError
  state.foo.set((state: number) => state + 2);
  // $ExpectError
  state.foo.set((state: string) => 2);
  // $ExpectError
  state.asdf;
};

describe("Record", () => {
  it("get and set work, and are chainable", () => {
    const state = Record.fromJS({
      foo: "hello",
      bar: 1,
    });
    const newState = state
      .bar.set((x) => x + 1)
      .foo.set((x) => x + " world");
    assert.equal(newState.bar.get(), 2);
    assert.equal(newState.foo.get(), "hello world");
  });
  it("toJS works", () => {
    const state = Record.fromJS({
      foo: "hello",
      bar: 1,
    });
    const newState = state
      .bar.set((x) => x + 1)
      .foo.set((x) => x + " world");
    assert.deepEqual(Record.toJS(newState), {
      foo: "hello world",
      bar: 2,
    });
  });
});

