import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { TodoSearch } from '../TodoSearch/TodoSearch';
import { StatusSelect } from '../StatusSelect/StatusSelect';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedOption: '',
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
      selectedOption: value,
    });
  }

  render() {
    const { query, selectedOption } = this.state;
    const { selectedTodoId, handleChange, todos } = this.props;

    const searchableTodos = todos.filter(({ title }) => (
      title.toLowerCase().includes(query)
    ));

    const selectedTodos = searchableTodos.filter((todo) => {
      if (selectedOption === 'active') {
        return todo.completed === false;
      }

      if (selectedOption === 'completed') {
        return todo.completed === true;
      }

      return true;
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <TodoSearch searchHandler={this.searchHandler} />
        <StatusSelect
          selectedOption={selectedOption}
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
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
