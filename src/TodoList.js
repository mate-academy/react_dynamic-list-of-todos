import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor({ todos }) {
    super(todos);
    this.todos = todos;

    this.state = {
      todosList: [...this.todos],
      sortedField: 'id',
    };
  }

  getSortedData = (event) => {
    const sortingBy = event.target.valueOf().textContent.toLowerCase();
    const { sortedField } = this.state;

    if (sortedField === sortingBy) {
      this.setState(prevState => ({
        todosList: [...prevState.todosList]
          .reverse(),
        sortedField: sortingBy,
      }
      ));
    } else {
      if (sortingBy === 'title') {
        this.setState(prevState => ({
          todosList: [...prevState.todosList]
            .sort((a, b) => a[sortingBy].localeCompare(b[sortingBy])),
          sortedField: sortingBy,
        }
        ));
      }

      this.setState(prevState => ({
        todosList: [...prevState.todosList]
          .sort((a, b) => a[sortingBy] - b[sortingBy]),
        sortedField: sortingBy,
      }
      ));
    }
  };

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">
        <h1 className="heading">Dynamic list of todos</h1>
        <table>
          <thead>
            <tr>
              <th onClick={this.getSortedData}>Id</th>
              <th onClick={this.getSortedData}>Title</th>
              <th onClick={this.getSortedData}>Status</th>
              <th onClick={this.getSortedData}>User</th>
            </tr>
          </thead>
          <tbody>
            {todosList.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default TodoList;
