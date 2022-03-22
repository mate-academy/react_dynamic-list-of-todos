/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  onSelect: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, onSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  const selectOptions = [{ id: 1, title: 'all' }, { id: 2, title: 'completed' }, { id: 3, title: 'not completed' }];

  const getSelectedOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  const getVisibleTodos = (
    todosFromServer: Todo[],
    queryFromInput: string,
  ): Todo[] => {
    let filteredTodos: Todo[] = todos;

    filteredTodos = todosFromServer.filter(todo => (
      todo.title.toLowerCase().includes(queryFromInput.toLowerCase())
    ));

    switch (selectedOption) {
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  const visibleTodos = getVisibleTodos(todos, query);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        className="TodoList__input"
        placeholder="Type search word"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.currentTarget.value);
        }}
      />

      <select
        className="TodoList__select"
        value={selectedOption}
        onChange={getSelectedOption}
      >
        {selectOptions.map(option => (

          <option
            value={option.title}
            key={option.id}
          >
            {option.title}
          </option>

        ))}
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              className={classnames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                type="button"
                onClick={() => onSelect(todo.userId)}
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
