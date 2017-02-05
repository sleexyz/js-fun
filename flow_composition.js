// @flow

/*
  Flow has scoped type variables!
  Time for some module fun...
*/

// Function module

class Func<B, C> {
  f: (B => C);
  constructor(f: B => C) {
    this.f = f;
  };
  static lift(f: B => C): Func<B, C> {
    return new Func(f);
  };
  lower(): B => C {
    return this.f;
  }
  rmap<D>(g: C => D): Func<B, D> {
    return Func.lift((x) => g(this.f(x)));
  };
  lmap<A>(g: A => B): Func<A, C> {
    return Func.lift((x) => this.f(g(x)));
  };
  apply(b: B) {
    return this.f(b);
  };
};

const toString = (x: number): string =>
      x.toString();

const fromString = (x: string): number =>
      parseInt(x);

const idString: (string => string) =
      Func.lift(toString)
      .lmap(fromString)
      .lower();

const idNumber: (number => number) =
      Func.lift(toString)
      .rmap(fromString)
      .lower();

// Object module

class Obj<A> {
  x: A;
  constructor(x: A) {
    this.x = x;
  };
  static lift(x: A): Obj<A> {
    return new Obj(x);
  };
  lower(): A {
    return this.x;
  };
  andThen<B>(f: A => B): Obj<B> {
    return new Obj(f(this.x));
  };
}

const x: number = Obj.lift(1)
      .andThen((x) => x + 1)
      .andThen((x) => x + 1)
      .andThen((x) => x + 1)
      .andThen((x) => x + 1)
      .lower();

console.log(x);
