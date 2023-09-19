import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
// import { getTodos } from '../../api';

type Props = {
  todos: Todo[],
  handleSelectedTodoUserId: (userId: number) => void,
  handleSelectTodo: (todo: Todo) => void,
  handleShowSelectedTodoButton: (value: boolean) => void,
  handleSelectButton: (value: boolean) => void,
  showButtonHide: boolean,
  selectedTodo: null | Todo,
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleSelectButton,
  handleSelectedTodoUserId,
  handleSelectTodo,
  handleShowSelectedTodoButton,
  showButtonHide,
  selectedTodo,
}) => {
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
          <tr
            key={todo.id}
            data-cy="todo"
            className={classnames({
              'has-background-info-light': selectedTodo?.id === todo.id,
            })}
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
              <p className={classnames(
                todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger',
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
                onClick={() => {
                  handleSelectButton(true);
                  handleSelectedTodoUserId(todo.userId);
                  handleSelectTodo(todo);
                  handleShowSelectedTodoButton(true);
                }}
              >
                <span className="icon">
                  <i
                    className={classnames('far', {
                      'fa-eye': !showButtonHide,
                      'fa-eye-slash': showButtonHide,
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
