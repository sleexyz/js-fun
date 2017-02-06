// @flow

type Hello = {
  type: "hello"
}
type World = {
  type: "world"
}
type Uranus = {
  type: "uranus"
}

type Thing = Hello | World | Uranus

const foo4 = {
  type: 'hello'
};

/*
 *
 * We grow information with refine
 *
 * At each step, we increase the domain of our handler.
 *
 */

class Fun<A, B> {
  f: A => B;
  constructor(f: A => B) {
    this.f = f;
  }
  static lift(f: A => B): Fun<A, B>{
    return new Fun(f);
  }
  lower(): (A => B) {
    return this.f;
  }
  refine<A1>(f: (A => B) => (A|A1) => B): Fun<A|A1, B> {
    return new Fun(f(this.f));
  }
}

const refinedHandler = Fun
  .lift((x: Hello) => {
    return 'hello'
  })
  .refine((fallback) => (x) => {
    if (x.type === 'world') {
      return 'world';
    }
    return fallback(x);
  })
  .lower();

const shouldTypeCheck4_0 = (refinedHandler: (Hello => string));
const shouldTypeCheck4_1 = (refinedHandler: (Hello | World) => string);
// const shouldNotTypeCheck4_2 = (refined: (Hello | World | Uranus) => string);
