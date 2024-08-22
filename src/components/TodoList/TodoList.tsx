import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo | null) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectedTodo,
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
        {todos.map(todo => {
          const isSelected =
            (selectedTodo && selectedTodo.id === todo.id) || false;

          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              isSelected={isSelected}
              onSelect={onSelectedTodo}
            />
          );
        })}
      </tbody>
    </table>
  );
};
