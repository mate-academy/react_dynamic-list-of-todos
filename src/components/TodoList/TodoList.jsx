import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { getTodos } from '../../API/api';

import './TodoList.scss';

export class TodoList extends Component {
  state = {
    todos: [],
    inputValue: '',
    selectValue: '',
    preparedTodos: [],
  }

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos, preparedTodos: todos,
    });
  }

  onChange = (e) => {
    const { value, name, type } = e.target;

    this.setState({ [name]: value });

    switch (type) {
      case 'text':
        return this.filterByTitle();

      default:
        return this.selectCategory(value);
    }
  }

  filterByTitle() {
    this.setState(prevState => ({
      preparedTodos: prevState.todos.filter(
        todo => ((todo.title !== null)
          ? todo.title.includes(prevState.inputValue)
          : null),
      ),
    }));
  }

  selectCategory(property) {
    switch (property) {
      case 'completed':
        this.setState(prevState => ({
          preparedTodos: prevState.todos.filter(
            todo => !todo.completed,
          ),
        }));
        break;

      case 'active':
        this.setState(prevState => ({
          preparedTodos: prevState.todos.filter(
            todo => todo.completed,
          ),
        }));
        break;

      default:
        this.setState(prevState => ({
          preparedTodos: [...prevState.todos],
        }));
    }
  }

  render() {
    const { selectedUser } = this.props;
    const { todos, selectValue, inputValue, preparedTodos } = this.state;
    const { onChange } = this;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        {todos.length > 0 && (
          <>
            <input
              className="input is-rounded"
              type="text"
              value={inputValue}
              name="inputValue"
              placeholder="type title here"
              onChange={onChange}
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
        )}
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos.map(todo => (
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
