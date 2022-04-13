import React, { memo, useMemo, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { TextInput } from '../InputComponents/TextInput';
import { SelectInput } from '../InputComponents/SelectInput';

interface Props {
  todos: Todo[],
  id: number,
  onSelect: (id: number) => void,
}

export const TodoList: React.FC<Props> = memo(({
  todos, id, onSelect,
}) => {
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { id: 1, name: 'all' },
    { id: 2, name: 'active' },
    { id: 3, name: 'completed' },
  ];

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()))
      .filter(todo => {
        switch (selectedOption) {
          case 'active':
            return todo.completed === false;
          case 'completed':
            return todo.completed === true;
          case 'all':
          default:
            return todo;
        }
      })
  ), [todos, title, selectedOption]);

  return (
    <div className="TodoList">
      <h2 className="title">Todos:</h2>

      <TextInput
        name="title"
        label=""
        inputValue={title}
        errorMessage=""
        placeholder="Search by title"
        onChange={handleInputChange}
      />

      <SelectInput
        name="filter"
        label=""
        inputValue={selectedOption}
        errorMessage=""
        options={options}
        onChange={handleSelectChange}
      />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  { 'TodoList__user-button--selected': todo.userId === id },
                )}
                type="button"
                onClick={() => onSelect(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
