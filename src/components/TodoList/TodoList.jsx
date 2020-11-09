import React from 'react';
import './TodoList.scss';
import ClassNames from 'classnames';
import { Todo } from '../Todo/Todo';

export class TodoList extends React.Component {
  render() {
    const { todos, selectUser, query, status } = this.props;

    let filteredTodos = todos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(query.toLowerCase()));

    if (status === 'Completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (status === 'Not completed') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    return (
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(({ completed, id, title, userId }) => (
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
                selectUser={selectUser}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
