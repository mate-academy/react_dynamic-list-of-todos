import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoListPropTypes } from './TodoListPropTypes';

export class TodoList extends React.Component {
  state = {
    selectValue: 'Both',
    inputValue: '',
  }

  selectSort = (todos) => {
    if (this.state.selectValue === 'Completed') {
      return todos.filter(x => x.completed);
    }

    if (this.state.selectValue === 'In proces') {
      return todos.filter(x => !x.completed);
    }

    return todos;
  }

  inputFilter = todos => (
    (this.state.inputValue.length)
      ? (todos.filter(x => x.title !== null
        && (x.title.includes(this.state.inputValue))))
      : todos);

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
            onChange={({ target }) => (
              this.setState({ inputValue: target.value }))}
            placeholder="search by title"
            value={this.state.inputValue}
          />
        </div>
        {(
          this.inputFilter(this.selectSort(todos))
            .map(x => (
              <div
                key={x.id}
                className="TodoList__list-container"
              >
                <ul className="TodoList__list">
                  <li className={classNames(
                    'TodoList__item', x.completed ? 'TodoList__item--checked'
                      : 'TodoList__item--unchecked',
                  )}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{x.title}</p>
                    </label>
                    <button
                      onClick={() => chooseTheUser(x.userId)}
                      className={classNames(
                        'TodoList__user-button button',
                        (selectedUserId === x.userId)
                          && ('TodoList__user-button--selected'),
                      )}
                      type="button"
                    >
                      User&nbsp;
                      {x.userId}
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
