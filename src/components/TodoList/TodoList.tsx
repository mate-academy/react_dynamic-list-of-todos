import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { getTodos } from '../../api';
import { CurrentTodo } from '../../contexts/CurrentTodoProvider';
import { Search, TypeFilter } from '../../contexts/SearchProvider';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { todo, setTodo } = useContext(CurrentTodo);
  const { value } = useContext(Search);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const getModifiedPosts = useCallback(() => {
    let resTodos = [...todos];

    switch (value.status) {
      case TypeFilter.DONE: {
        resTodos = resTodos.filter(x => x.completed);

        break;
      }

      case TypeFilter.PLANNED: {
        resTodos = resTodos.filter(x => !x.completed);

        break;
      }
    }

    if (value.textValue.trim().length > 0) {
      resTodos = resTodos.filter(x =>
        x.title.toLowerCase().includes(value.textValue.toLowerCase()),
      );
    }

    return resTodos;
  }, [todos, value]);

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
        {getModifiedPosts().map(t => {
          return (
            <tr key={t.id} data-cy="todo" className="">
              <td className="is-vcentered">{t.id}</td>
              <td className="is-vcentered">
                {t.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-success': t.completed },
                    { 'has-text-danger': !t.completed },
                  )}
                >
                  {t.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setTodo(t)}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        {
                          'fa-eye': !todo || todo.id !== t.id,
                        },
                        {
                          'fa-eye-slash': todo && todo.id === t.id,
                        },
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
