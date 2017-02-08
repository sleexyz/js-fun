//@flow

class State<S> {state: S;}

/*
   Potential Redux Actions/Reducer/State Generator
   Here we use the constructor to initialize the state.
*/

const initialState = {
  todos: [
    {value: 'write todomvc'},
    {value: 'enjoy how meta this is'},
  ]
};

class Foo extends State {
  constructor() {
    super();
    this.state = initialState;
  }
  addTodo() {
    this.state.todos;
  }
  removeTodo() {
  }
}

export default Foo;
