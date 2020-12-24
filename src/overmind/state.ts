import { derived } from 'overmind';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export enum Filter {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
}

type State = {
  todos: {
    [id: string]: Todo;
  };
  filter: Filter;
  currentTodos: Todo[];
};

export const state: State = {
  todos: {},
  filter: Filter.ALL,
  currentTodos: derived((_, state: State) => {
    return Object.values(state.todos).filter(todo => {
      if (state.filter === Filter.ALL) {
        return true;
      }
      if (state.filter === Filter.ACTIVE && !todo.completed) {
        return true;
      }
      if (state.filter === Filter.COMPLETED && todo.completed) {
        return true;
      }
      return false;
    });
  }),
};
