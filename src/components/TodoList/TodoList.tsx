import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';
import { filterTodos } from '../../utils';

interface Props {
  todos: Todo[],
  filter?: Filters,
  selectedTodo: Todo | null,
  onSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export const TodoList: React.FC<Props> = ({
  todos,
  filter = { status: 'all', title: '' },
  selectedTodo,
  onSelectTodo,
}) => {
  const filteredTodos = filterTodos(todos, filter);

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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
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
                  <i className={classNames('far', {
                    'fa-eye': selectedTodo !== todo,
                    'fa-eye-slash': selectedTodo === todo,
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
