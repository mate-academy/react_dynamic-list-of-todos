import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    query: '',
    selectedType: '',
  }

  handleTypeChange = (event) => {
    const { value } = event.target;
    const { todos } = this.props;

    let filteredTodos = [...todos];

    this.setState({
      selectedType: value,
    });

    let filteredByType;

    switch (value) {
      case 'Completed':
        filteredByType = filteredTodos.filter(todo => todo.completed);

        break;
      case 'Active':
        filteredByType = filteredTodos.filter(todo => !todo.completed);

        break;
      default:
      case 'All':
        filteredByType = filteredTodos;
        break;
    }

    const filteredByQuery = filteredByType.filter((todo) => {
      if (todo.title === '' || !!todo.title) {
        return todo.title.includes(this.state.query.toLowerCase());
      }

      return false;
    });

    this.props.addFilterTodos(filteredByQuery);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { todos } = this.props;

    this.setState({
      [name]: value,
    });

    const filteredByQuery = todos.filter((todo) => {
      if (todo.title === '' || !!todo.title) {
        return todo.title.includes(value.toLowerCase());
      }

      return false;
    });


    let filteredByType = [...filteredByQuery];

        switch (this.state.selectedType) {
      case 'Completed':
        filteredByType = filteredByQuery.filter(todo => todo.completed);

        break;
      case 'Active':
        filteredByType = filteredByQuery.filter(todo => !todo.completed);

        break;
      default:
      case 'All':
        filteredByType = filteredByQuery;
        break;
    }

    this.props.addFilterTodos(filteredByType);
  }

  render() {
    const { query, selectedType } = this.state;

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
          name="selectedType"
          value={selectedType}
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
