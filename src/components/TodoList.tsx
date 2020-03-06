import React, { FC } from 'react';

import { Todo } from './Todo';
import { TodoWithUser } from '../utils/types';

interface Props {
  todos: TodoWithUser[];
  onClickSortButton(option: string): void;
}

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    onClickSortButton,
  } = props;

  return (
    <table className="todo__table">
      <thead>
        <tr>
          <th className="table__title">
            <button
              type="button"
              onClick={() => onClickSortButton('ID')}
              className="table__button"
            >
              number task
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => onClickSortButton('title')}
              className="table__button"
            >
              Title
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => onClickSortButton('name')}
              className="table__button"
            >
              Name
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => onClickSortButton('condition')}
              className="table__button"
            >
              Condition
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
      </tbody>
    </table>
  );
};
