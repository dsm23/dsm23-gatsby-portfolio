import React, { FunctionComponent } from 'react';
import { Todo } from '../../overmind/state';
import { useOvermind } from '../../overmind';

type Props = {
  todo: Todo;
};

const TodoItem: FunctionComponent<Props> = ({ todo }) => {
  const { actions } = useOvermind();
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          actions.toggleCompleted(todo);
        }}
      />
      {todo.title}
    </li>
  );
};

export { TodoItem };
