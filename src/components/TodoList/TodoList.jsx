import React from 'react';
import ClassNames from 'classnames';
import { Todo } from '../Todo/Todo';
import { Filter } from '../Filter/Filter';
import { TodoListProps } from '../../props/TodoListProps';
import './TodoList.scss';

export const TodoList = ({
  todos,
  filterText,
  handleChange,
  selectValue,
  changeUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <Filter
      className="TodoList__controllers"
      filterText={filterText}
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
