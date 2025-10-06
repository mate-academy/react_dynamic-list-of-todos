import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, selectedTodo, onSelectTodo }) => {
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
        {todos.map((todo: Todo) => {
          if (todo.completed) {
            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': selectedTodo?.id === todo.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onSelectTodo(todo.id)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': selectedTodo?.id !== todo.id,
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': selectedTodo?.id === todo.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered" />
                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => onSelectTodo(todo.id)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': selectedTodo?.id !== todo.id,
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};
