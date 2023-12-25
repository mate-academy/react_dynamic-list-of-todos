import React from 'react';
import { Todo } from '../../libs/types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  selectedId?: number,
  onSelect: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectedId, onSelect }) => (
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
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </tbody>
  </table>
);
