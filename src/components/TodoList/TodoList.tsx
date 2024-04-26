import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleShowModal: (todo: Todo) => void;
  filterStatus: 'all' | 'active' | 'completed';
  filterTitle: string;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleShowModal,
  filterStatus,
  filterTitle,
  selectedTodo,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    setFilteredTodos(prev =>
      prev.filter((todo: Todo) => {
        const titleFit = filterTitle
          ? todo.title.toLowerCase().includes(filterTitle.toLowerCase())
          : true;

        return (
          (filterStatus === 'all' ||
            (filterStatus === 'completed' && todo.completed) ||
            (filterStatus === 'active' && !todo.completed)) &&
          titleFit
        );
      }),
    );
  }, [filterTitle, filterStatus]);

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
        {filteredTodos.map((todo: Todo, index: number) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              selectedTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
          >
            <td className="is-vcentered">{index + 1}</td>
            <td className="is-vcentered">
              {/* <span className="icon" data-cy="iconCompleted"> */}
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
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
                onClick={() => {
                  handleShowModal(todo);
                  // setModuloButtonClicked(todo.id);
                }}
                data-cy="selectButton"
                className="button"
                type="button"
              >
                <span className="icon">
                  <i
                    className={
                      selectedTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
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
