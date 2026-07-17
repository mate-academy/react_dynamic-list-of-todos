import React from 'react';

import { Todo } from '../../types/Todo';

import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoListComponent: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  /* eslint-disable no-console */
  console.log('render TodoList');

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
            key={todo.id}
            todo={todo}
            isSelected={todo.id === selectedTodoId}
            onSelect={onSelectTodo}
          />
        ))}
      </tbody>
    </table>
  );
};

export const TodoList = React.memo(TodoListComponent);
