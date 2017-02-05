// @flow

/*
  Verdict: flow-static-land's compose produces the worst error messages
*/

import * as fun from 'flow-static-land/lib/Fun';

const numToString = (x: number): string => {
  return x.toString();
};

const id = (x) => x;

// Long ass error message...
// const shouldNotTypeCheck = fun.compose(numToString, numToString);

const compose = <A, B, C>(
    f: B => C, 
    g: A => B
    ): (A => C) => {
  return (x) => f(g(x));
}

// const reallyShouldNotTypeCheck = compose(numToString, numToString);
