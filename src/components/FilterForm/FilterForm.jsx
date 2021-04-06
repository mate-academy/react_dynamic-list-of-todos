import React from 'react';
import PropTypes from 'prop-types';

export class FilterForm extends React.Component {
  state = {
    select: '',
  }

  filterTitle = (event) => {
    const { value } = event.target;
    const { todos } = this.props;
    const filterTodo = todos
      .filter(todo => (todo.title ? todo.title.includes(value) : false));

    this.props.newState(filterTodo);
  }

  handleSelection = (event) => {
    const { name, value } = event.target;
    let filterTodo = this.props.todos;

    switch (value) {
      case 'completed':
        filterTodo = filterTodo.filter(todo => todo.completed);
        break;
      case 'active':
        filterTodo = filterTodo.filter(todo => !todo.completed);
        break;
      default:
      case 'all':
        break;
    }

    this.props.newState(filterTodo);

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <>
        <div>
          <input
            placeholder="Filter"
            onChange={this.filterTitle}
          />
        </div>
        <select
          name="select"
          value={this.state.select}
          onChange={this.handleSelection}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </>
    );
  }
}

FilterForm.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  newState: PropTypes.func.isRequired,
};
