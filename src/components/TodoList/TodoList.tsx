import React from 'react';
import classnames from 'classnames';

import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos: todos,
  selectedTodo,
  setSelectedTodo,
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
        <tr
          key={todo.id}
          data-cy="todo"
          className={classnames({
            'has-background-info-light': todo.completed,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered" />
          <td className="is-vcentered is-expanded">
            <p
              className={classnames({
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
              onClick={() => setSelectedTodo(todo)}
            >
              <span className="icon">
                <i
                  data-cy={todo.completed ? 'iconCompleted' : 'iconActive'}
                  className={classnames('far', {
                    'fa-eye-slash': selectedTodo?.id === todo.id,
                    'fa-eye': selectedTodo?.id !== todo.id,
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
