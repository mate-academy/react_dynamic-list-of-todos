import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    query: '',
    select: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { todos, saveTodos, userId } = this.props;
    const { query } = this.state;

    this.setState({
      [name]: value,
    });

    let filteredTodos = todos.filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));

    switch (value) {
      case 'Active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'By userId':
        if (!userId) {
          return;
        }

        filteredTodos = filteredTodos.filter(
          todo => todo.userId === userId,
        );
        break;
      default:
        break;
    }

    saveTodos(filteredTodos);
  }

  render() {
    const { query, select } = this.state;

    return (
      <form>
        <input
          className="form__input form"
          type="text"
          name="query"
          placeholder="find title..."
          value={query}
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
      </form>
    );
  }
}

Form.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ),
  saveTodos: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

Form.defaultProps = {
  todos: [],
};
