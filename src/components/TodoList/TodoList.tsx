import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[],
  selectedTodoId: number,
  onTodoSelection: (id: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onTodoSelection,
}) => (
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

    <TodoItem
      todos={todos}
      selectedTodoId={selectedTodoId}
      onTodoSelection={onTodoSelection}
    />
  </table>
);
