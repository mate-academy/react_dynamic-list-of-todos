import React from 'react';

import { Todo } from '../Todo/Todo';

interface Props {
  todos: Todo[];
}

export const TodosList: React.FC<Props> = ({ todos }) => (
  <ul className="app__list">
    {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
  </ul>
);
