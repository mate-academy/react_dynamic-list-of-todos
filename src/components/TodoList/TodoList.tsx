import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { List } from '../List/List';

type Props = {
  visibleTodos: Todo[];
  openedTodoId: number | null;
  onClick: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = (
  {
    visibleTodos,
    openedTodoId,
    onClick,
  },
) => {
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
        {visibleTodos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames(
              {
                'has-background-info-light': openedTodoId === todo.id,
              },
            )}
          >
            <List
              openedTodoId={openedTodoId}
              onClick={onClick}
              todo={todo}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
