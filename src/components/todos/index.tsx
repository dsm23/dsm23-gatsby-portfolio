import React, { FunctionComponent, useState } from 'react';

import 'twin.macro';

import { useOvermind } from '../../overmind';
import { Filter } from '../../overmind/state';
import { TodoItem } from './Todo';

const Todos: FunctionComponent = () => {
  const [title, setTitle] = useState<string>('');
  const { state, actions } = useOvermind();

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          actions.addTodo(title);
          setTitle('');
        }}
      >
        <input
          tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
          value={title}
          onChange={event => {
            return setTitle(event.currentTarget.value);
          }}
        />
      </form>
      <div>
        <button
          tw="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            actions.changeFilter(Filter.ALL);
          }}
        >
          all
        </button>
        <button
          tw="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            actions.changeFilter(Filter.ACTIVE);
          }}
        >
          active
        </button>
        <button
          tw="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            actions.changeFilter(Filter.COMPLETED);
          }}
        >
          completed
        </button>
      </div>
      <ul>
        {state.currentTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export { Todos };
