import React, { memo } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { FormSection } from '../Form/FormSection';

interface Props {
  todos: Todo[],
  id: number,
  onSelect: (id: number) => void,
  onFilter: (source: string, value: string) => void,
}

export const TodoList: React.FC<Props> = memo(({
  todos, id, onSelect, onFilter,
}) => (
  <div className="TodoList">
    <h2 className="title">Todos:</h2>

    <FormSection
      onFilter={onFilter}
    />

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
));
