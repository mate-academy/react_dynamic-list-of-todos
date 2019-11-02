import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem/TodoItem';

class TodoTable extends React.Component {

  render() {
    const { todos } = this.props;

    return (
      <table className="ui celled table table-width" >
        <thead>
          <th>Title</th>
          <th>Name</th>
          <th>Status</th>
        </thead>
        <tbody>
          {todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)};
        </tbody>
      </table>
    )
  }
}

TodoItem.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoTable;
