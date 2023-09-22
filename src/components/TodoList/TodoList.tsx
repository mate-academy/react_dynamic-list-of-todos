import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setShowModal: (show: boolean) => void,
  setUserId: (id: number) => void,
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo) => void
};

export const TodoList: React.FC<Props> = ({
  todos, setShowModal, setUserId, setSelectedTodo, selectedTodo,
}) => {
  const handleClick = (show: boolean, todo: Todo) => {
    setShowModal(show);
    setUserId(todo.userId);
    setSelectedTodo(todo);
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
        {todos.map((todo) => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo === todo,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
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
                  handleClick(true, todo);
                }}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': selectedTodo === todo,
                    'fa-eye': !(selectedTodo === todo),
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
