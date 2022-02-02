import React from 'react';
import './TodoList.scss';

import cn from 'classnames';
import {
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  inputValue: string,
  selectValue: string,
  selectUserHandler: (userId: string) => void,
  changeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
  changeSelectValue: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  randomize: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  inputValue,
  selectValue,
  selectUserHandler,
  changeInputValue,
  changeSelectValue,
  randomize,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div>
      <InputGroup className="mb-3">
        <div className="TodoList__control-panel">
          <div className="TodoList__input">
            <FormControl
              value={inputValue}
              onChange={changeInputValue}
              placeholder="Search by title"
            />
          </div>
          <div className="TodoList__select">
            <Form.Select
              value={selectValue}
              onChange={changeSelectValue}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not completed">Not completed</option>
            </Form.Select>
          </div>
          <button
            className="button TodoList__button"
            type="button"
            onClick={randomize}
          >
            Randomize
          </button>
        </div>
      </InputGroup>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.length !== 0 && todos.map(todo => (
          <li
            className={cn('TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed })}
            key={todo.id}
          >
            <label htmlFor={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={cn('TodoList__user-button button',
                { 'TodoList__user-button--selected': +todo.userId === selectedUserId })}
              type="button"
              value={todo.userId}
              onClick={() => selectUserHandler(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
