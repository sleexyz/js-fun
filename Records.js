// @flow

// Naive Typesafe immutable records
// TODO: lets try for a constant time set

import { assert } from 'chai';

interface LensMethods<S, T> {
  get: () => T,
  set: (T => T) => S,
};

type $ToLensMethods<S> = <T>(v: T) => LensMethods<S, T>;

interface $Record<S: {}> {
  children: $ObjMap<S, $ToLensMethods<Record<S>>>,
  +toJS: () => S,
}

class Record<S: {}> {
  children: $ObjMap<S, $ToLensMethods<Record<S>>>;
  _obj: S;
  constructor(obj: S) {
    this._obj = obj;
    const children = {};
    const keys = Object.keys(this._obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      children[key] = {
        get: () => this._obj[key],
        set: (f) => new Record({ ...this._obj, [key]: f(this._obj[key]) }),
      };
    }
    this.children = children;
  }
  toJS() {
    return this._obj;
  }
}

(Record: Class<$Record<*>>);

// typechecker test
() => {
  const state = new Record({
    foo: "hello",
    bar: 1,
  });
  // Correct
  state.children.foo.get();
  // Correct
  state.children.foo.set((x) => x + " world");
  // $ExpectError
  state.children.foo.set();
  // $ExpectError
  state.children.foo.set((state: number) => state + 2);
  // $ExpectError
  state.children.foo.set((state: string) => 2);
  // $ExpectError
  state.children.asdf;
}

describe("Record", () => {
  it("get and set work, and are chainable", () => {
    const state = new Record({
      foo: "hello",
      bar: 1,
    });
    const newState = state
      .children.bar.set((x) => x + 1)
      .children.foo.set((x) => x + " world");
    assert.equal(newState.children.bar.get(), 2);
    assert.equal(newState.children.foo.get(), "hello world");
  });
});

