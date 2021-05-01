import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

import { Input } from '../Input';
import { Todo, todoType } from '../Todo';

export class TodoList extends React.Component {
  state = {
    searchValue: '',
    selectorValue: 'all',
  }

  handleChange = (e) => {
    const { todosVisible, filtered } = this.props;
    const { selectorValue, searchValue } = this.state;
    const elementTodo = todosVisible.find(todo => todo.id === +e.target.id);

    elementTodo.completed = !elementTodo.completed;
    filtered(selectorValue, searchValue);
  }

  setSearchValue = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  setSelectorValue = (e) => {
    this.setState({ selectorValue: e.target.value });
  }

  render() {
    const { selectUser, search,
      filtered, shuffle, todosVisible } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <Input
          searchValue={searchValue}
          setSearchValue={this.setSearchValue}
          setSelectorValue={this.setSelectorValue}
          search={search}
          filtered={filtered}
          shuffle={shuffle}
        />
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosVisible.map(todo => (
              <Todo
                selectUser={selectUser}
                todo={todo}
                handleChange={this.handleChange}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todosVisible: PropTypes.arrayOf(todoType).isRequired,
  search: PropTypes.func.isRequired,
  filtered: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};
