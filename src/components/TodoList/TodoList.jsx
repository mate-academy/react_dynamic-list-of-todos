import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { Todo } from '../Todo/Todo';

export class TodoList extends React.Component {
  state = {
    selector: '',
  }

  render() {
    const { todos, filter, selectUser, setFilter } = this.props;
    const filteredTodos = todos.filter(x => (filter
      ? x.title !== null && x.title.includes(filter)
      : true))
      .filter((x) => {
        if (this.state.selector === 'active') {
          return x.completed === false;
        }

        if (this.state.selector === 'completed') {
          return x.completed === true;
        }

        return true;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            placeholder="Filter by title"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
          <select
            onChange={event => this.setState({ selector: event.target.value })}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <Todo key={todo.id} todo={todo} selectUser={selectUser} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.string,
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  selectUser: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
