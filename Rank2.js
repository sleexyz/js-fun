// @flow

class Foo<A: {toString: () => string}>{ 
  val: A;
  constructor(val: A) {
    this.val = val;
  }
  get() {
    return this.val
  }
  toString() {
    return this.val.toString();
  }
}

type ExistsFoo<A> = <B>(Foo<A> => B) => B;
