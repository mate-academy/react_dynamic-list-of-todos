import React, { useEffect } from 'react';
import classNames from 'classnames';
import { getTodos, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  setIsLoading,
  setIsModalOpen,
  setUser,
  setIsModalLoading,
  setSelectedTodo,
  selectedTodo,
}) => {
  useEffect(() => {
    getTodos().then((res: Todo[]) => {
      setTodos(res);
      setIsLoading(false);
    });
  }, [setTodos, setIsLoading]);

  const openModal = (userId: number) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    getUser(userId).then(res => {
      setUser(res);
      setIsModalLoading(false);
    });
  };

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodo(todos.find(todo => todo.id === todoId) ?? null);
  };

  if (todos.length === 0 && todos) {
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
      </table>
    );
  }

  return (
    <>
      {todos.length !== 0 && (
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
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': todo.id === selectedTodo?.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check"></i>
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
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
                    onClick={() => {
                      handleSelectTodo(todo.id);
                      openModal(todo.userId);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': selectedTodo?.id !== todo.id,
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
