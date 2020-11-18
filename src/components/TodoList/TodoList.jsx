import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    search: '',
    filteredTodos: 'all',
  }

  filter = {
    all: () => true,
    completed: todo => todo.completed,
    active: todo => !todo.completed,
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { todos, selectedUserId, onButtonClick } = this.props;
    const { search, filteredTodos } = this.state;
    const todosToShow = todos
      .filter(todo => todo.title
        && todo.title.toLowerCase().includes(search.toLowerCase())
          && this.filter[filteredTodos](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="ui input">
          <input
            name="search"
            placeholder="Type search task"
            className="form-control"
            value={search}
            onChange={this.changeHandler}
          />
        </div>

        <div>
          <select
            name="filteredTodos"
            value={filteredTodos}
            onChange={this.changeHandler}
            className="ui selection dropdown"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
          <ul className="TodoList__list">
            {todosToShow
              ? (todosToShow.map(todo => (
                <Todo
                  todo={todo}
                  onButtonClick={onButtonClick}
                  isSelectedUser={selectedUserId === todo.userId}
                  key={todo.id}
                />
              )))
              : <p>No tasks</p>}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
