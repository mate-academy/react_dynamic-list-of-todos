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
    <tbody>
      {todos.map(({ id, title, completed }) => {
        const isSelected = selectedTodoId === id;

        return (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            isSelected={isSelected}
            onTodoSelection={onTodoSelection}
          />
        );
      })}
    </tbody>
  </table>
);
