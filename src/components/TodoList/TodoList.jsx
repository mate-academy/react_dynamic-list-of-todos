import React from 'react';
import ClassNames from 'classnames';
import { Todo } from '../Todo';
import { Controllers } from '../Controllers';
import './TodoList.scss';
import { TodoListProps } from '../../props/TodoListProps';

export const TodoList = ({
  todos,
  filterQuery,
  handleChange,
  selectValue,
  changeUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <Controllers
      className="TodoList__controllers"
      filterQuery={filterQuery}
      handleChange={handleChange}
      selectValue={selectValue}
    />

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(({ completed, id, title, userId }) => (
          <li
            key={id}
            className={ClassNames('TodoList__item', {
              'TodoList__item--checked': completed,
              'TodoList__item--unchecked': !completed,
            })}
          >
            <Todo
              completed={completed}
              title={title}
              userId={userId}
              handleChange={handleChange}
              changeUserId={changeUserId}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = TodoListProps;
