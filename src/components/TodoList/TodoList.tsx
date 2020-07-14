import React from 'react';
import { TodoItem } from './TodoItem';
import { Button } from '../Button';
import { SortFields } from '../Enums';

type Props = {
  todos: Todo[];
  headers: SortButton[];
  handleSortButton: (type: SortFields) => void;
};

export const TodoList: React.FC<Props> = ({ todos, headers, handleSortButton }) => (
  <table className="table">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.name} className="bd-callout is-primary">
            <Button
              text={header.name}
              className="button is-primary is-inverted is-outlined is-medium is-fullwidth"
              handleClick={() => handleSortButton(header.field)}
            />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);
