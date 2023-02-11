import React from 'react';

import { TodoItem } from '../TodoItem';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  selectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, selectedTodoId, selectTodo }) => (
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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectedTodoId={selectedTodoId}
            selectTodo={selectTodo}
          />
        ))}
      </tbody>
    </table>
  ),
);
