/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

import { Todo } from '../Todo';

const options = ['all', 'active', 'completed'];

export class TodoList extends React.Component {
  state = {
    search: '',
    selected: 'all',
  };

  filtredList = () => {
    const { todos } = this.props;
    const { search, selected } = this.state;

    if (todos) {
      let todoCopy = [...todos];

      if (selected === 'active') {
        todoCopy = todoCopy.filter((todo) => todo.title && !todo.completed);
      }

      if (selected === 'completed') {
        todoCopy = todoCopy.filter((todo) => todo.title && todo.completed);
      }

      return todoCopy.filter(
        (todo) => todo.title && todo.title.includes(search)
      );
    }

    return [];
  };

  render() {
    const { setSelectedUserId, pressedUserBtn, setPressedUserBtn } = this.props;
    const { search, selected } = this.state;
    const list = this.filtredList();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={search}
          placeholder="search"
          onChange={(e) => this.setState({ search: e.target.value })}
        />

        <select
          name="select"
          value={selected}
          onChange={(e) => this.setState({ selected: e.target.value })}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {list.length > 0
              ? list.map((todo) => (
                  <Todo
                    todo={todo}
                    setSelectedUserId={setSelectedUserId}
                    pressedUserBtn={pressedUserBtn}
                    setPressedUserBtn={setPressedUserBtn}
                    key={todo.id}
                  />
                ))
              : 'No todos'}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  setSelectedUserId: PropTypes.func.isRequired,
  setPressedUserBtn: PropTypes.func.isRequired,
  pressedUserBtn: PropTypes.number,
};

TodoList.defaultProps = {
  todos: [],
  pressedUserBtn: 0,
};
