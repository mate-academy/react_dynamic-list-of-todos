import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import classNames from 'classnames';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  setSelectedTodo: (selectedTodo: Todo) => void;
  setSelectedUser: (selectedUser: number) => void;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loading,
  setSelectedTodo,
  setSelectedUser,
  selectedTodo,
}) => {
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
        {loading ? (
          <Loader />
        ) : (
          todos.map(todo => {
            const isSelected = selectedTodo && selectedTodo.id === todo.id;

            return (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                {!todo.completed ? (
                  <td className="is-vcentered" />
                ) : (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
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
                    onClick={() => {
                      setSelectedUser(todo.userId);
                      setSelectedTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': !isSelected,
                          'fa-eye-slash': isSelected,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
