import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[],
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  activeTodo: Todo | null,
  query: string,
  sortBy: string
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const {
    todos,
    setIsOpenModal, setActiveTodo,
    activeTodo,
    query,
    sortBy,
  } = props;

  const openTodoModal = (todo: Todo) => {
    setIsOpenModal(true);
    setActiveTodo(todo);
  };

  const sort = () => {
    const convertedQuery = query.toLowerCase().trim();

    const todosCopy = [...todos].filter(todo => {
      return todo.title.toLowerCase().includes(convertedQuery);
    });

    if (sortBy !== 'all') {
      return todosCopy.filter(todo => {
        return sortBy === 'completed'
          ? todo.completed
          : !todo.completed;
      });
    }

    return todosCopy;
  };

  const sortedList = useMemo(() => {
    return sort();
  }, [todos, query, sortBy]);

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
        {sortedList.map((todo) => {
          return (
            <tr data-cy="todo" className="" key={todo.id}>
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
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
                )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {activeTodo?.id === todo.id ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => openTodoModal(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
