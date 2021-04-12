import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SearchForm } from '../Form/SearchForm';

export class TodoList extends React.Component {
  state = {
    searchOption: '',
    searchTitle: '',
    todos: this.props.todosFromServer,
  }

  filterTodoByTitle = (event) => {
    const { value } = event.target;

    this.setState({
      searchTitle: value,
      todos: this.props.todosFromServer
        .filter(todo => todo.title.toLowerCase()
          .includes(value.toLowerCase())),
    });
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ searchOption: value });
  }

  filterTodosByOptions = (todos) => {
    const { searchOption } = this.state;

    switch (searchOption) {
      case 'Active':
        return todos.filter(item => !item.completed);

      case 'Completed':
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  }

  render() {
    const { chooseUser } = this.props;
    const { todos, searchTitle } = this.state;
    const prepearedTodos = this.filterTodosByOptions(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <SearchForm
          searchTitle={searchTitle}
          filterTodoByTitle={this.filterTodoByTitle}
          handleChange={this.handleChange}
        />
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {prepearedTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <p>{todo.completed ? '✔' : '❌'}</p>
                  <p>{todo.title}</p>
                </label>
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => chooseUser(todo.userId)}
                >
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
  todosFromServer: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  chooseUser: PropTypes.func.isRequired,
};
