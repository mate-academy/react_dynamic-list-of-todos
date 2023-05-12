import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

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

    <tbody>
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            selectedTodoId={selectedTodoId}
            onTodoSelection={onTodoSelection}
          />
        );
      })}
    </tbody>
  </table>
);
