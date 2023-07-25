import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props{
  todos: Todo[],
  handleClick: (item: Todo) => void
  activeTodo: Todo,
}

export const TodoList: React.FC<Props> = ({
  todos, handleClick, activeTodo,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <TodoItem
            item={todo}
            key={todo.id}
            activeItem={activeTodo}
            handleClick={handleClick}
          />
        ))}

      </tbody>
    </table>
  );
};
