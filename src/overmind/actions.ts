import { Action } from 'overmind';
import { Filter, Todo } from './state';

export const addTodo: Action<string> = ({ state }, title) => {
  const id = Date.now().toString();

  state.todos[id] = {
    id,
    title,
    completed: false,
  };
};

export const changeFilter: Action<Filter> = ({ state }, filter) => {
  state.filter = filter;
};

export const toggleCompleted: Action<Todo> = (_, todo) => {
  todo.completed = !todo.completed;
};
