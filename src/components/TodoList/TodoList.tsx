import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  setSelectedId,
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
      {todos.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </tbody>
  </table>
);
