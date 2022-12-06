import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo;
  setShowTodoModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo>>,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setShowTodoModal,
  setSelectedTodo,
}) => {
  const handleClick = (todo: Todo) => {
    if (selectedTodo !== todo) {
      setSelectedTodo(todo);
    }

    setShowTodoModal(true);
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
        {todos.map(todo => (
          <tr data-cy="todo" className="">
            <td className="is-vcentered">
              {todo.id}
            </td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  `has-text-${todo.completed ? 'success' : 'danger'}`,
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye': selectedTodo.id !== todo.id,
                      'fa-eye-slash': selectedTodo.id === todo.id,
                    },
                  )}
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
