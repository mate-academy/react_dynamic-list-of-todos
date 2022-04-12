import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { TextInput } from '../InputComponents/TextInput';
import './TodoList.scss';
import { SelectInput } from '../InputComponents/SelectInput';

interface Props {
  todos: Todo[],
  id: number,
  onSelect: (id: number) => void,
  onFilter: (source: string, value: string) => void,
}

export const TodoList: React.FC<Props> = memo(({
  todos, id, onSelect, onFilter,
}) => {
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState('all');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSelected('all');
    onFilter('input', event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    setTitle('');
    onFilter('select', event.target.value);
  };

  const options = [
    { id: 1, name: 'all' },
    { id: 2, name: 'active' },
    { id: 3, name: 'completed' },
  ];

  return (
    <div className="TodoList">
      <h2 className="title">Todos:</h2>

      <form onSubmit={handleSubmit} className="TodoList__form">
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
          inputValue={selected}
          errorMessage=""
          options={options}
          onChange={handleSelectChange}
        />
      </form>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className="TodoList__item TodoList__item--unchecked"
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
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
