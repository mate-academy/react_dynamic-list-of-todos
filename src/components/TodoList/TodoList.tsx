import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  dataTodos: Todo[];
  setChosenTodo: (todo: Todo) => void;
  chosenTodo: Todo | null;
};

export const TodoList: React.FC<TodoListProps> = ({
  dataTodos,
  setChosenTodo,
  chosenTodo,
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
      {dataTodos.map((todo) => (
        <tr
          data-cy="todo"
          className=""
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
            <p className={cn(
              {
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              },
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
              onClick={() => (setChosenTodo(todo))}
            >
              <span className="icon">
                <i className={cn('far', {
                  'fa-eye': todo.id !== chosenTodo?.id,
                  'fa-eye-slash': todo.id === chosenTodo?.id,
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
