import React from 'react';

import Todo from '../Todo/Todo';

interface Props {
  todos: Todo[];
}

const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="app__list">
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default TodosList;
