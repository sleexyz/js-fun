//@flow

class State<S> {state: S;}
declare function makeState<S, O: Class<State<S>>>(initialState: S, stateObj: O): empty;

/*
   Potential Redux Actions/Reducer/State Generator
   Here we use a function makeState to initialize the state.
*/

const initialState = {
  todos: [
    {value: 'write todomvc'},
    {value: 'enjoy how meta this is'},
  ]
};

class Foo extends State {
  addTodo() {
    this.state.todos;
  }
  removeTodo() {

  }
}

export default makeState(initialState, Foo);

/*
   Question is: Can we index the class methods?
*/
