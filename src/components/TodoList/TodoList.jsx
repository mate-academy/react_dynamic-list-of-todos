import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodoShape } from '../shapes/TodoShape';
import { Todo } from '../Todo';
import { FilterForm } from '../FilterForm';

export class TodoList extends React.Component {
  state = {
    searchValue: '',
    selectValue: 'all',
    shuffledTodos: [],
  }

  filter = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  }

  search = (event) => {
    const { value } = event.target;

    this.setState({
      searchValue: value,
    });
  }

  selectFilter = (event) => {
    const { value } = event.target;

    this.setState({
      selectValue: value,
    });
  }

  shuffleTodos = (todos) => {
    const shuffledTodos = [...todos];

    return shuffledTodos.sort(() => Math.random() - 0.5);
  }

  randomizeTodos = () => {
    const { todos } = this.props;

    this.setState({
      shuffledTodos: this.shuffleTodos(todos),
    });
  }

  render() {
    const { todos, selectedTodoId, selectUser } = this.props;
    const { searchValue, selectValue, shuffledTodos } = this.state;
    let filteredTodos;

    if (shuffledTodos.length) {
      filteredTodos = shuffledTodos.filter(this.filter[selectValue]);
    } else {
      filteredTodos = todos.filter(this.filter[selectValue]);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <button
            type="button"
            className="TodoList__button button"
            onClick={this.randomizeTodos}
          >
            Randomize
          </button>

          <FilterForm
            searchValue={searchValue}
            selectValue={selectValue}
            search={this.search}
            selectFilter={this.selectFilter}
          />

          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  selectedTodoId={selectedTodoId}
                  selectUser={selectUser}
                  searchValue={searchValue}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(TodoShape)).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
