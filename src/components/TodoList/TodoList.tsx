import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  selected: Todo | '';
  onSelect: (todo: Todo | '') => void;
};

export const TodoList: React.FC<Props> = ({ todos, selected, onSelect }) => {
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
            todo={todo}
            selected={selected}
            key={todo.id}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
};
