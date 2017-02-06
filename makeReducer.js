// @flow

// Turns 
// {
//   foo(state, payload) {},
//   bar(state, payload) {},
// }
//
// Into a reducer that handles types with tags `foo` and `bar`.



export const makeReducer = <S, O: Object>(actionsObj: O) => (state: S, action: {
  type: $Keys<O>,
  payload: any,
}): S => {
  const {type, payload} = action;
  const keys = actionsObj.keys();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (type === key) {
      return actionsObj[key](state, action);
    }
  }
  throw new Error('This should never run');
};

