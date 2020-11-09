import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { StatusSelect } from '../StatusSelect/StatusSelect';
import { todoPropTypesShape } from '../../propTypesShapes/todoPropTypesShape';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedStatus: '',
  }

  searchHandler = (event) => {
    const { value } = event.target;

    this.setState({
      query: value.toLowerCase(),
    });
  }

  handleSelect = (event) => {
    const { value } = event.target;

    this.setState({
      selectedStatus: value,
    });
  }

  render() {
    const { query, selectedStatus } = this.state;
    const { selectedTodoId, handleChange, todos } = this.props;

    const searchableTodos = todos.filter(({ title }) => (
      title.toLowerCase().includes(query)
    ));

    let selectedTodos = '';

    if (selectedStatus === '') {
      selectedTodos = searchableTodos;
    } else {
      selectedTodos = searchableTodos.filter((todo) => {
        if (selectedStatus === 'active') {
          return todo.completed === false;
        }

        if (selectedStatus === 'completed') {
          return todo.completed === true;
        }

        return true;
      });
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <TodoSearch searchHandler={this.searchHandler} />
        <StatusSelect
          selectedStatus={selectedStatus}
          handleSelect={this.handleSelect}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {selectedTodos.map(({ id, completed, title, userId }) => (
              <Todo
                key={id}
                completed={completed}
                title={title}
                userId={userId}
                id={id}
                selectedTodoId={selectedTodoId}
                handleChange={handleChange}
              />
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
      ...todoPropTypesShape,
    }).isRequired,
  ).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
