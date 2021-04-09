import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    query: '',
    todoStatus: '',
  }

  handleSearch = (event) => {
    const { name, value } = event.target;
    const { todos } = this.props;
    const { query } = this.state;

    this.setState({
      [name]: value,
    });

    let filteredTodos = todos.filter(todo => (todo.title.includes(query.toLowerCase())));

    switch (value) {
      case 'completed':
        filteredTodos = filteredTodos.filter(activity => activity.completed);

        break;
      case 'active':
        filteredTodos = filteredTodos.filter(activity => !activity.completed);

        break;
      default:
      case 'all':

        break;
    }

    this.props.setTodos(filteredTodos);
  }

  render() {
    const { query, todoStatus } = this.state;

    return (
      <form className="form">
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Type todo title"
          name="query"
          value={query}
          onChange={this.handleSearch}
        />
        {' '}
        <select
          name="todoStatus"
          value={todoStatus}
          onChange={this.handleSearch}
        >
          <option value="">
            Choose a status to see todos
          </option>
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>
      </form>
    );
  }
}

Form.propTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};
