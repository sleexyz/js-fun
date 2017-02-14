// @flow
import type {Reducer} from 'redux'

// Idea: reducers and constants should be complete opaque; they're an implementation detail.
// TODO: make namespacing combinators actions

type OutputType<S, O> = {
  actions: $ObjMap<O, <P>(v: (S, P) => S) => (payload: P, error: ?Error) => empty>,
  reducer: Reducer<S, {type: $Keys<O>}>
};

const makeState = <S, O: *>(initialState: S, actions: O): OutputType<S, O> => ({
  actions: (() => {
    const keys = Object.keys(actions);
    const ret = {};
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      ret[key] = (payload, error) => ({
        type: key,
        payload: payload,
        error: error
      });
    }
    return ret;
  })(),
  reducer: (state = initialState, action) => {
    const keys = Object.keys(actions);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === action.type) {
        return actions[key](state, action);
      }
    }
    return state;
  }
});

export default makeState;
