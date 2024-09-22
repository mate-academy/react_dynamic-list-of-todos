import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Loader } from '../Loader';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  filterBy: string;
  filterBySelect: string;
  setModalShowId: (value: number) => void;
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  modalShowId: number;
};

export const TodoList: React.FC<Props> = ({
  filterBy,
  filterBySelect,
  setModalShowId,
  setTodos,
  todos,
  modalShowId,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
        setLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке задач:', error);
      });
  }, []);

  let filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filterBy.toLowerCase()),
  );

  if (filterBySelect !== 'all') {
    if (filterBySelect === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
    } else {
      filteredTodos = filteredTodos.filter(todo => todo.completed === false);
    }
  }

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
        ) : filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                {todo.completed ? (
                  <p className="has-text-success">{todo.title}</p>
                ) : (
                  <p className="has-text-danger">{todo.title}</p>
                )}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setModalShowId(todo.id)}
                >
                  <span className="icon">
                    {modalShowId === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="has-text-centered">
              Ничего не найдено
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
