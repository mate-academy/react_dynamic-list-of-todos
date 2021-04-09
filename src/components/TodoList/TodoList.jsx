import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';

export class TodoList extends React.Component {
  state = {
    query: '',
    select: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos(list) {
    switch (this.state.select) {
      case 'Active':
        return list.filter(todo => !todo.completed);
      case 'Completed':
        return list.filter(todo => todo.completed);
      case 'By userId':
        if (!this.props.userId) {
          return list;
        }

        return list.filter(todo => todo.userId === this.props.userId);
      default:
        return list;
    }
  }

  render() {
    const { todos, selectUser } = this.props;
    const { query, select } = this.state;

    const selectedTodos = this.filterTodos(todos);

    const filteredTodos = query
      ? selectedTodos.filter(todo => todo.title.toLowerCase()
        .includes(query.toLowerCase()))
      : selectedTodos;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Form
          query={query}
          onChange={this.handleInputChange}
        />

        <select
          onChange={this.handleInputChange}
          name="select"
          value={select}
        >
          <option value="All">
            All
          </option>
          <option value="Active">
            Active
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="By userId">
            This user only(choose a user and try)
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed === true
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={`${todo.completed === true
                      ? 'checked'
                      : ''}`}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ),
};

TodoList.defaultProps = {
  todos: [],
};
