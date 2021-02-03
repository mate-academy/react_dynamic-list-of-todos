import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export class TodoList extends React.Component {
  state = {
    query: '',
    option: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { query, option } = this.state;

    const currentTodos = todos
      .filter(todo => todo.userId !== null && todo.title !== '')
      .filter((todo) => {
        if (query) {
          return (
            todo.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        return todo;
      })
      .filter((todo) => {
        if (option === 'active') {
          return !todo.completed;
        }

        if (option === 'completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">

        <input
          type="text"
          className="input is-rounded"
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Primary input"
        />

        <div className="select">
          <select
            name="option"
            value={this.state.option}
            onChange={this.handleChange}
          >
            <option value="">take a choose</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <h2>Todos:</h2>
        {currentTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectUser={selectUser}
            selectedUserId={selectedUserId}
          />
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
};
