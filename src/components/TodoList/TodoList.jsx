import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoShape } from '../../shapes/TodoShape';
import { FilterField } from '../FilterField';
import { TodoItem } from '../TodoItem';

export class TodoList extends Component {
  state = {
    search: '',
    shownTodos: 'all',
  }

  filterByAccomplishment = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectUser, shuffleTodos, selectedUserId } = this.props;
    const { search, shownTodos } = this.state;

    const filteredTodos = todos
      .filter((todo) => {
        const todoString = todo.title.toLowerCase();
        const searchString = search.toLowerCase();

        return (todoString.includes(searchString)
          && this.filterByAccomplishment[shownTodos](todo));
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <FilterField
          search={search}
          handleChange={this.handleChange}
          shownTodos={shownTodos}
          shuffleTodos={shuffleTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(({ id, userId, completed, title }) => (
              <li
                key={id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !completed,
                  'TodoList__item--checked': completed,
                })}
              >
                <TodoItem
                  userId={userId}
                  completed={completed}
                  title={title}
                  selectedUserId={selectedUserId}
                  selectUser={() => selectUser(userId)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
