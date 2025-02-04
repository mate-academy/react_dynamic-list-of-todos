import React from 'react';
import { Todo } from '../../types/Todo';
import { PostItem } from '../PostItem/PostItem';

type Props = {
  todos: Todo[];
  onSelect: (id: number) => void;
  selectedId: number | null;
};

export const TodoList: React.FC<Props> = ({ todos, onSelect, selectedId }) => {
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
          <PostItem
            todo={todo}
            onSelect={onSelect}
            selectedId={selectedId}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
