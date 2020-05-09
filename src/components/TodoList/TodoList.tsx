import React from 'react';
import { Todo, SortButton } from '../Interfaces';
import { TodoItem } from './TodoItem';
import { Button } from '../Button';

interface Props {
  todos: Todo[];
  SORT_BUTTONS: SortButton[];
  handleSortButton: (type: string) => void;
}

export const TodoList: React.FC<Props> = ({ todos, SORT_BUTTONS, handleSortButton }) => (
  <table className="table">
    <thead>
      <tr>
        {SORT_BUTTONS.map((button) => (
          <th key={button.name} className="bd-callout is-primary">
            <Button
              text={button.name}
              className="button is-primary is-inverted is-outlined is-medium is-fullwidth"
              handleClick={() => handleSortButton(button.field)}
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
