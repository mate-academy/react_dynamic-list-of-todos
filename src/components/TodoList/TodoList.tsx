import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../types/TodoType';

type Props = {
  todos: Todo[],
  chooseUserId: (userId: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  chooseUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  const handlerSelect = (cell: string) => {
    setStatus(cell);

    let selectedTodos = todos;

    if (cell === 'completed') {
      selectedTodos = selectedTodos
        .filter((selectedTodo) => selectedTodo.completed === true);
    }

    if (cell === 'active') {
      selectedTodos = selectedTodos
        .filter((selectedTodo) => selectedTodo.completed === false);
    }

    if (cell === 'all') {
      selectedTodos = todos;
    }

    if (query.trim() !== '') {
      selectedTodos = selectedTodos.filter((selectedTodo) => (
        selectedTodo.title.includes(query.trim())
      ));
    }

    setVisibleTodos(selectedTodos);
  };

  const sortTodosAlphabet = (text: string) => {
    setQuery(text);

    const selectedTodos = todos.filter((todo) => (
      todo.title.includes(text.trim())
    ));

    setVisibleTodos(selectedTodos);
  };

  return (
    <div className="TodoList">
      <h2>
        Todos:&nbsp;
        {visibleTodos.length}
        &nbsp;from&nbsp;
        {todos.length}
      </h2>
      <input
        className="Todolist__input"
        data-cy="filterByTitle"
        type="text"
        name="title"
        value={query}
        onChange={(event) => sortTodosAlphabet(event.target.value)}
      />
      <select
        className="Todolist__select"
        name="status"
        value={status}
        onChange={(event) => {
          handlerSelect(event.target.value);
        }}
      >
        <option value="all">
          Demonstrate all
        </option>
        <option value="active">
          Demonstrate active
        </option>
        <option value="completed">
          Demonstrate completed
        </option>

      </select>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map((todo) => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked':
                    todo.completed === false,
                  'TodoList__item--checked':
                    todo.completed === true,
                },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                type="button"
                onClick={() => chooseUserId(Number(todo.userId))}
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  {
                    'TodoList__user-button--selected':
                      selectedUserId !== Number(todo.userId),
                  },
                )}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
