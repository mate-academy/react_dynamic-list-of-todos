import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  onInspectClick: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onInspectClick,
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
      {todos.map(todo => (
        todo.completed
          ? (
            <tr
              key={todo.id}
              data-cy="todo"
              className=""
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
                  title="select"
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onInspectClick(todo)}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      { 'fa-eye-slash': selectedTodo?.id === todo.id },
                      { 'fa-eye': selectedTodo?.id !== todo.id },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
          : (
            <tr
              key={todo.id}
              data-cy="todo"
              className=""
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered" />
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  title="select"
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onInspectClick(todo)}
                >
                  <span className="icon">
                    <i className={cn(
                      'far',
                      { 'fa-eye-slash': selectedTodo?.id === todo.id },
                      { 'fa-eye': selectedTodo?.id !== todo.id },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          )
      ))}
    </tbody>
  </table>
);
