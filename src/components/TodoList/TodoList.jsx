import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export class TodoList extends React.Component {
  state = {
    selectOption: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterBySelect = (todos) => {
    const { selectOption } = this.state;

    switch (selectOption) {
      case 'completed':
        return todos.completed;

      case 'active':
        return !todos.completed;

      default:
        return true;
    }
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const selectedTodos = todos.filter(this.filterBySelect);

    return (
      <div className="TodoList">

        <div className="select">
          <select
            value={this.selectOption}
            onChange={this.handleChange}
            name="selectOption"
            id="selectOption"
          >
            <option value="">take a choose</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <h2>Todos:</h2>
        {selectedTodos && selectedTodos.map(todo => (
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
