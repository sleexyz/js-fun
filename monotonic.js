// @flow

// Information Gainer
type Monotonic<A, B: A> = A => B

type WithX = {
  x: number
}

type WithY = {
  y: number
}

const foo1 = (x: WithX) => {
  return Object.assign({});
}
// const shouldNotTypeCheck1 = (foo1: Monotonic<WithX, *>)


const foo2 = (x: WithX) => {
  return Object.assign({}, x);
}
const shouldTypeCheck2 = (foo2: Monotonic<WithX, *>)


const foo3 = (x: WithX) => {
  return Object.assign({}, x, {
    y: 2
  });
}
const shouldTypeCheck3_0 = (foo3: Monotonic<WithX, *>)
const shouldTypeCheck3_1 = (foo3: Monotonic<WithX, WithX & WithY>)
