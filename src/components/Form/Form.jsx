import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    query: '',
    selectedTodo: '',
  }

  handleTypeChange = (event) => {
    const { value } = event.target;
    const { todos } = this.props;

    let filteredTodos = [...todos];

    this.setState({
      selectedTodo: value,
    });

    switch (value) {
      case 'Completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);

        break;
      case 'Active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);

        break;
      default:
      case 'All':

        break;
    }

    this.props.addFilterTodos(filteredTodos);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { todos } = this.props;

    this.setState({
      [name]: value,
    });

    const filteredTodos = todos.filter((todo) => {
      if (todo.title === '' || !!todo.title) {
        return todo.title.includes(value.toLowerCase());
      }

      return false;
    });

    this.props.addFilterTodos(filteredTodos);
  }

  render() {
    const { query, selectedTodo } = this.state;

    return (
      <form>
        <input
          type="text"
          placeholder="Search title"
          name="query"
          value={query}
          onChange={this.handleInputChange}
        />

        <select
          name="selectedTodo"
          value={selectedTodo}
          onChange={this.handleTypeChange}
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
        </select>
      </form>
    );
  }
}

Form.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  addFilterTodos: PropTypes.func.isRequired,
};
