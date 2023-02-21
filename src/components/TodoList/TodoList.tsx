import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSetSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

const getIconElement = (className: string) => (
  <span className="icon" data-cy="iconCompleted">
    <i className={className} />
  </span>
);

const getRowClassName = (selectedTodo: Todo | null, todo: Todo) => classNames(
  { 'has-background-info-light': selectedTodo?.id === todo.id },
);

export const TodoList: React.FC<Props> = ({
  todos,
  onSetSelectedTodo,
  selectedTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>{getIconElement('fas fa-check')}</th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map((todo) => (
        <tr
          data-cy="todo"
          key={todo.id}
          className={getRowClassName(selectedTodo, todo)}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && getIconElement('fas fa-check')}
          </td>
          <td className={classNames('is-vcentered', {
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
          >
            {todo.title}
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSetSelectedTodo(todo)}
            >
              <span className="icon">
                <i
                  className={classNames('far', {
                    'fa-eye': todo !== selectedTodo,
                    'fa-eye-slash': todo === selectedTodo,
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
