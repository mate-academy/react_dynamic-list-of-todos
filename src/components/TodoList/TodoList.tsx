import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type TodoListProps = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  selectedTodo,
  onSelectTodo,
}) => (
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
      {todos.map(todo => {
        const isSelected = selectedTodo?.id === todo.id;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelected,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="has-text-danger is-vcentered" />
            )}

            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
