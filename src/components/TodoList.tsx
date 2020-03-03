import React, { FC } from 'react';

import { Todo } from './Todo';
import { TodoWithName } from '../utils';

interface Props {
  todos: TodoWithName[];
  onNameButton(): void;
  onTitleButton(): void;
  onConditionButton(): void;
  onTaskButton(): void;
}

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    onNameButton,
    onTitleButton,
    onConditionButton,
    onTaskButton,
  } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={onTaskButton}
              className="headerButton"
            >
number task
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={onTitleButton}
              className="headerButton"
            >
Title
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={onNameButton}
              className="headerButton"
            >
Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={onConditionButton}
              className="headerButton"
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
