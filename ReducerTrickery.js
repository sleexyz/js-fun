// @flow

type TodoState = {
  todos: {
    [key: String] : {
      value: String
    }
  }
}

const exampleActionObj = {
  addTodo(state: TodoState, payload: string) {
  },
  deleteTodo(state: TodoState, payload: number) {
  }
}

type ExtractActionFromReducer<A> = <O>(v: (any, A) => any) => A

type MakeAction<S, AO> = {
  type: $Keys<AO>,
  action: $PropertyType<MakeAction<S, AO>, 'type'>
}

declare function makeReducerFromActionObj<S, AO: Object>(actionObj: AO): (state: S, MakeAction<S, AO>) => S;

