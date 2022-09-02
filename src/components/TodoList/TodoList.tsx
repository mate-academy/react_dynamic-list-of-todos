import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodoId: (v: number) => void,
  selectedTodo: Todo | undefined,
  filteredList: Todo[],
}

export const TodoList: React.FC<Props> = (props) => {
  const { selectedTodoId, selectedTodo, filteredList } = props;

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
        {filteredList.map((todo) => {
          return (
            // eslint-disable-next-line no-constant-condition
            false
              ? <Loader />
              : (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={classNames(selectedTodo
                    && selectedTodo.id === todo.id
                     && 'has-background-info-light')}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className={classNames(
                        todo.completed && 'fas fa-check',
                      )}
                      />
                    </span>
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={classNames(todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger')}
                    >
                      { todo.title }
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => selectedTodoId(todo.id)}
                    >
                      <span className="icon">
                        <i className={classNames(selectedTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye')}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              )
          );
        })}
      </tbody>
    </table>
  );
};
