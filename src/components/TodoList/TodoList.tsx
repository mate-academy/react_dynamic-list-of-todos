import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setSelectedTodo: React.Dispatch<React.SetStateAction<null | Todo>>;
  selectedFilter: string;
  selectedQuery: string;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  selectedFilter,
  selectedQuery,
  selectedTodo,
}) => {
  const filterList = (filterProp: string, todosList: Todo[]) => {
    switch (filterProp) {
      case 'all':
        return todosList.filter(todo => (todo.completed || !todo.completed)
          && todo.title.includes(selectedQuery.toLowerCase()));

      case 'completed':
        return todosList.filter(todo => todo.completed
          && todo.title.includes(selectedQuery.toLowerCase()));

      case 'active':
        return todosList.filter(todo => !todo.completed
          && todo.title.includes(selectedQuery.toLowerCase()));

      default:
        return todosList;
    }
  };

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
        {filterList(selectedFilter, todos).map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setSelectedTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far fa-eye', {
                      'fa-eye-slash': selectedTodo?.userId === todo.userId,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
