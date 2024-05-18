import React, { useContext } from 'react';
import { createdContext } from '../TodoContext';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  modalButton: (value: boolean) => void;
  modalState: (todo: Todo | null) => void;
  todos: Todo[];
  resultClick: boolean;
};

export const TodoList: React.FC<Props> = ({
  modalButton,
  modalState,
  todos,
  resultClick,
}: Props) => {
  const { filterButton, searchedText } = useContext(createdContext);

  const filteredTodos = todos
    .filter(todo => {
      switch (filterButton) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo =>
      todo.title
        .toLowerCase()
        .trim()
        .includes(searchedText.toLowerCase().trim()),
    );

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
        {filteredTodos.map(filtrTodo => (
          <tr data-cy="todo" className="" key={filtrTodo.id}>
            <td className="is-vcentered">
              {filtrTodo.id}{' '}
              {filtrTodo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p
                className={classNames('has-text-success', {
                  'has-text-danger': !filtrTodo.completed,
                })}
              >
                {filtrTodo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  modalState(filtrTodo);
                  modalButton(true);
                }}
              >
                <span className="icon">
                  {resultClick ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
