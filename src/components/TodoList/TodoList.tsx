import React, { memo, useState } from 'react';
import { TextInput } from '../InputComponents/TextInput';
import './TodoList.scss';
import 'bulma';
import { SelectInput } from '../InputComponents/SelectInput';

interface Props {
  todos: Todo[],
  onSelect: (id: number) => void,
  onFilter: (source: string, value: string) => void,
}

export const TodoList: React.FC<Props> = memo(({
  todos, onSelect, onFilter,
}) => {
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState('all');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onFilter('input', event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    onFilter('select', event.target.value);
  };

  const options = [
    { id: 1, name: 'all' },
    { id: 2, name: 'active' },
    { id: 3, name: 'completed' },
  ];

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

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
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
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
