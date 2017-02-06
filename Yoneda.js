// @flow


type DoubleNegate<A> = <B>(A => B) => B

function doubleNegationTranslation <A>(x: A): DoubleNegate<A> {
  return <B>(f: A => B): B => f(x);
}
(doubleNegationTranslation: <A>(x: A) => DoubleNegate<A>);
(doubleNegationTranslation: <A>(x: A) => <B>(A => B) => B);

function unDoubleNegate<A>(k: DoubleNegate<A>): A {
  return k(x => x);
}

// Can we assert (application of) the yoneda isomorphism with flow?

function id<A>(x: A): A {
  return unDoubleNegate(doubleNegationTranslation(x));
}

(id(1): 1);
// (id(1): 2); 
