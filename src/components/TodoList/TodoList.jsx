import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { getTodos } from '../../API/api';

import './TodoList.scss';

export class TodoList extends Component {
  state = {
    todos: [],
    selectValue: '',
  }

  async componentDidMount() {
    this.setState({ todos: await getTodos() });
  }

  filterByTitle = async(event) => {
    const { value } = event.target;
    let todos = await getTodos();

    todos = todos.filter(todo => ((todo.title !== null)
      ? todo.title.includes(value)
      : null));

    this.setState({ todos });
  }

  onChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });

    return this.selectCategory(value);
  }

  selectCategory = async(property) => {
    const todos = await getTodos();

    switch (property) {
      case 'completed':
        this.setState({ todos: todos.filter(
          todo => !todo.completed,
        ) });
        break;

      case 'active':
        this.setState({ todos: todos.filter(
          todo => todo.completed,
        ) });
        break;

      default:
        this.setState({ todos });
    }
  }

  render() {
    const { selectedUser } = this.props;
    const { todos, selectValue } = this.state;
    const { onChange, filterByTitle } = this;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <>
          <input
            className="input is-rounded"
            type="text"
            placeholder="type title here"
            onChange={filterByTitle}
          />
          <div className="select is-rounded">
            <select
              name="selectValue"
              value={selectValue}
              onChange={onChange}
            >
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </div>
        </>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                selectedUser={selectedUser}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  selectedUser: PropTypes.func.isRequired,
};
