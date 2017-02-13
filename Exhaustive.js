// @flow
// Taken from 'http://ouicar.github.io/2016/08/08/exhaustive-switch.html'

const impossible = (x: empty): any => {
  throw new Error('this should not happen');
}

type Color = 'red' | 'blue' | 'green';

const exhaustiveCheck = (x: Color): string => {
  if (x === 'red') {
    return 'red';
  } else if (x === 'blue') {
    return 'blue';
  } else if (x === 'green') {
    return 'green';
  }
  return impossible(x);
}

const nonExhaustiveCheck = (x: Color): string => {
  if (x === 'red') {
    return 'red';
  } else if (x === 'blue') {
    return 'blue';
  }
  // $ExpectError
  return impossible(x);
}
