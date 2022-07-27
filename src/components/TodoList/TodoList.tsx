import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoID: Todo | null
  todos: Todo[],
  selectedTodo: (value: Todo) => void,
  userId: (value: React.SetStateAction<number>) => void

};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  userId,
  selectedTodoID,
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
          <Fragment key={todo.id}>
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(
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
                    selectedTodo(todo);
                    userId(todo.userId);
                  }}
                >
                  <span className="icon">

                    <i className={classNames('far', {
                      'fa-eye-slash': selectedTodoID?.id === todo.id,
                      'fa-eye': !(selectedTodoID?.id === todo.id),
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </Fragment>
        );
      })}

    </tbody>
  </table>
);
