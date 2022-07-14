import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getTodos } from '../../api\'s/api';
import './TodoList.scss';

type HandleSetSelectedUserId = (id: number) => void;

interface Props {
  handleSetSelectedUserId: HandleSetSelectedUserId;
  selectedUserId: number;
}

export const TodoList: React.FC<Props> = ({
  handleSetSelectedUserId,
  selectedUserId,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [todosCategory, setTodosCategory] = useState('all');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  const queryMatched = (title: string) => (
    title.toLowerCase().includes(query.toLowerCase())
  );

  function prepareTodos() {
    switch (todosCategory) {
      case 'active':
        return todos.filter(({ title, completed }) => (
          queryMatched(title) && completed === false
        ));
      case 'completed':
        return todos.filter(({ title, completed }) => (
          queryMatched(title) && completed
        ));
      default:
        return todos.filter(({ title }) => (
          queryMatched(title)
        ));
    }
  }

  const visibleTodos = prepareTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="filter"
        className="input is-primary"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <br />
      <br />

      <div className="select is-primary">
        <select
          value={todosCategory}
          onChange={(event) => {
            setTodosCategory(event.target.value);
          }}
        >
          <option value="all">All todos</option>
          <option value="active">Active todos</option>
          <option value="completed">Completed todos</option>
        </select>
      </div>

      <br />
      <br />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(({
            id,
            title,
            userId,
            completed,
          }) => (
            completed
              ? (
                <li
                  className="TodoList__item TodoList__item--checked"
                  key={id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked
                      readOnly
                    />
                    <p>{title}</p>
                  </label>

                  <button
                    className={cn('TodoList__user-button button',
                      {
                        // eslint-disable-next-line max-len
                        'TodoList__user-button--selected': selectedUserId === userId,
                      })}
                    type="button"
                    onClick={() => {
                      handleSetSelectedUserId(userId);
                    }}
                  >
                    User&nbsp;#
                    {userId}
                  </button>
                </li>
              )
              : (
                <li
                  className="TodoList__item TodoList__item--unchecked"
                  key={id}
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{title}</p>
                  </label>

                  <button
                    className={cn('TodoList__user-button button',
                      {
                        // eslint-disable-next-line max-len
                        'TodoList__user-button--selected': selectedUserId === userId,
                      })}
                    type="button"
                    onClick={() => {
                      handleSetSelectedUserId(userId);
                    }}
                  >
                    User&nbsp;#
                    {userId}
                  </button>
                </li>
              )
          ))}
        </ul>
      </div>
    </div>
  );
};
