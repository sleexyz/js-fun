// @flow

type Reducer<S, A> = (S, A) => S;
type PartialReducer<S, A1> = (Reducer<S, *>) => Reducer<S, *|A1>;


class ReducerBuilder<S, A> {
  f: Reducer<S, A>;
  constructor(f: Reducer<S, A>) {
    this.f = f;
  }
  static lift(f: Reducer<S, A>): ReducerBuilder<S, A>{
    return new ReducerBuilder(f);
  }
  lower(): Reducer<S, A> {
    return this.f;
  }
  refine<A1>(f: PartialReducer<S, A1>): ReducerBuilder<S, (A|A1)> {
    return new ReducerBuilder(f(this.f));
  }
}

type Hello = {
  type: "hello"
}
type World = {
  type: "world"
}
type Unrecognized = {
  type: "asdf"
}

const handleWorld: PartialReducer<*, World> = (fallback) => (state, action) => {
  if (action.type === 'world') {
    return 'world';
  }
  return fallback(state, action);
}


const reducer = ReducerBuilder
  .lift((state, action: Hello) => {
    return 'hello'
  })
  .refine(handleWorld)
  .lower();

(reducer: Reducer<string, Hello>);
(reducer: Reducer<string, Hello | World>);
// (reducer: Reducer<String, Unrecognized>); // should not typecheck!
// (reducer: Reducer<String, Hello | World | Unrecognized>); // should not typecheck!


/*
 *
 * But this is still clunky...
 *
 * We need a simple way to combine reducers.
 * Let's try $ObjMap
 *
 */

type Tag<A> = {
  type: A
}

const reducers = {
  hello: (state, action) => {
    return state;
  },
  world: (state, action) => {
    return state;
  }
}


// If only I had a way to type the payloads...
// horizontal reducer combination
const combineReducers = <S, O: Object>(obj: O) => (state: S, action: {type: $Keys<O>}): S  => {
  const keys = Object.keys();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (action.type == key) {
      return obj[key](state, action);
    }
  }
  return state;
}


/*
 *
 * What I need: type level lists, and a way to union the type level list...
 *
 */
