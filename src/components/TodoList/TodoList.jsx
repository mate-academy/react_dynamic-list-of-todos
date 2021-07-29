import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoListPropTypes } from './TodoListPropTypes';

export class TodoList extends React.Component {
  state = {
    selectValue: 'Both',
    inputValue: '',
  }

  changeInput = value => (
    this.setState({ inputValue: value }));

  selectSort = (todos) => {
    if (this.state.selectValue === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    if (this.state.selectValue === 'In proces') {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  }

  inputFilter = (todos) => {
    if (this.state.inputValue.length) {
      return (todos.filter(todo => todo.title !== null
        && (todo.title.includes(this.state.inputValue))));
    }

    return todos;
  };

  render() {
    const { chooseTheUser, selectedUserId, todos } = this.props;

    return (
      <div className="TodoList">
        <h2>
          Todos:&nbsp;
          {
              this.inputFilter(this.selectSort(todos)).length
          }
        </h2>
        <div className="block__input">
          <select
            onChange={({ target }) => (
              this.setState({ selectValue: target.value }))}
          >
            <option value="Both">Both</option>
            <option value="Completed">Completed</option>
            <option value="In proces">In process</option>
          </select>
          <input
            onChange={({ target }) => this.changeInput(target.value)}
            placeholder="search by title"
            value={this.state.inputValue}
          />
        </div>
        {(
          this.inputFilter(this.selectSort(todos))
            .map(todo => (
              <div
                key={todo.id}
                className="TodoList__list-container"
              >
                <ul className="TodoList__list">
                  <li className={classNames(
                    'TodoList__item', todo.completed ? 'TodoList__item--checked'
                      : 'TodoList__item--unchecked',
                  )}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>
                    <button
                      onClick={() => chooseTheUser(todo.userId)}
                      className={classNames(
                        'TodoList__user-button button',
                        (selectedUserId === todo.userId)
                          && ('TodoList__user-button--selected'),
                      )}
                      type="button"
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                </ul>
              </div>
            ))
        )}
      </div>
    );
  }
}

TodoList.propTypes = TodoListPropTypes;
