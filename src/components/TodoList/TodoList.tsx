import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

enum States {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Props {
  openedTodo: Todo | null;
  setOpenedTodo: (todo: Todo) => void;
  filter: string;
  search: string;
  standartList: Todo[];
}
export const TodoList: React.FC<Props> = ({
  openedTodo,
  setOpenedTodo,
  filter,
  search,
  standartList,
}) => {
  const [todos, setTodos] = useState<Todo[]>(standartList);

  const res = [...standartList].filter(el =>
    el.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  useEffect(() => {
    switch (filter) {
      case States.All:
        setTodos(res);
        break;

      case States.Active:
        setTodos(res.filter(el => !el.completed));
        break;

      case States.Completed:
        setTodos(res.filter(el => el.completed));
        break;
    }
  }, [filter, search]);

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
        {todos.map(el => (
          <tr data-cy="todo" key={el.id}>
            <td className="is-vcentered">{el.id}</td>
            <td className="is-vcentered">
              {el.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : (
                ''
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !el.completed,
                  'has-text-success': el.completed,
                })}
              >
                {el.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setOpenedTodo(el)}
              >
                <span className="icon">
                  <i
                    className={cn({
                      'far fa-eye-slash': openedTodo?.id === el.id,
                      'far fa-eye': openedTodo?.id !== el.id,
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
};
