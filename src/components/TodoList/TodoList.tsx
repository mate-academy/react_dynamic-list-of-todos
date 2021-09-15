import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoStatus } from '../../types';

import { TodoFilter } from '../TodoFilter';

interface Props {
  todos: Todo[];
  selectUser: (userId: number) => void;
}

interface State {
  titlePhrase: string;
  todoStatus: TodoStatus;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    titlePhrase: '',
    todoStatus: TodoStatus.Default,
  };

  handleChange = (value: string) => {
    this.setState({
      titlePhrase: value,
    });
  };

  selectStatus = (status: TodoStatus) => {
    this.setState({
      todoStatus: status,
    });
  };

  getTodoStatus = (completed: boolean) => {
    const { todoStatus } = this.state;

    switch (todoStatus) {
      case TodoStatus.Active:
        return !completed;
      case TodoStatus.Completed:
        return completed;
      default:
        return true;
    }
  };

  getFilteredTodos = (todos: Todo[]) => {
    const { titlePhrase } = this.state;

    return todos.filter(
      todo => {
        const { title, completed } = todo;

        return title && title.includes(titlePhrase) && this.getTodoStatus(completed);
      },
    );
  };

  render() {
    const { todos, selectUser } = this.props;
    const { titlePhrase, todoStatus } = this.state;
    const visibleTodos = this.getFilteredTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <TodoFilter
          titlePhrase={titlePhrase}
          handleChange={this.handleChange}
          todoStatus={todoStatus}
          selectStatus={this.selectStatus}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => {
              const {
                id, title, completed, userId,
              } = todo;

              return (
                <li
                  key={id}
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': completed },
                    { 'TodoList__item--unchecked': !completed },
                  )}
                >
                  <label>
                    <input type="checkbox" readOnly checked={completed} />
                    <p>{title}</p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      { 'TodoList__user-button--selected': completed },
                      'button',
                    )}
                    type="button"
                    onClick={() => selectUser(userId)}
                  >
                    {`User${userId}`}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
