import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selectedId: number;
  onSelect: (id: number) => void;
  onReset: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  onSelect,
  onReset,
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
        const isSelected = todo.id === selectedId;

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={isSelected}
            onClick={isSelected ? () => onReset() : onSelect}
          />
        );
      })}
    </tbody>
  </table>
);
