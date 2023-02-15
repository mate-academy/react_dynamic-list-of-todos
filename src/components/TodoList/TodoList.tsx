import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosProvider';

type Props = {
  getDataToModal: (userId: number, currentId: Todo) => void;
  isModalLoading: boolean;
};

export const TodoList: React.FC<Props> = React.memo(({
  getDataToModal,
  isModalLoading,
}) => {
  const { filtredTodos } = useContext(TodosContext);

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

      {filtredTodos
        && (
          <tbody>
            {filtredTodos.map(todo => (
              <tr key={todo.id} data-cy="todo" className="">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && <i className="fas fa-check" />}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
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
                    onClick={() => (
                      getDataToModal(todo.userId, todo)

                    )}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                        'fa-eye': !isModalLoading,
                        'fa-eye-slash': isModalLoading,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
    </table>
  );
});
