// @flow

type ExampleMap = {
  [key: string]: {
    id: number
  },
};

// Empty object counts as a map
({}: ExampleMap);

({ foo: { id: 2 } }: ExampleMap);

// $ExpectError
({ foo: { id: null } }: ExampleMap);

// $ExpectError
({ foo: null }: ExampleMap);

