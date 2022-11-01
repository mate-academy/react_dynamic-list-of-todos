import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onHandleShowTodoModal: (todoId: string | undefined) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    onHandleShowTodoModal,
    selectedTodoId,
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
          return (
            <tr data-cy="todo" className="" key={todo.id}>
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
                <p className={classnames(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
                )}
                >
                  { todo.title }
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  data-todoid={todo.id}
                  onClick={(event) => {
                    onHandleShowTodoModal(event.currentTarget.dataset.todoid);
                  }}
                >
                  <span className="icon">
                    <i className={classnames('far',
                      { 'fa-eye': selectedTodoId !== todo.id },
                      { 'fa-eye-slash': selectedTodoId === todo.id })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ),
);
