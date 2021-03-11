import React from 'react';
import './TodoList.scss';
import className from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
    isRandom: false,
  }

  changedValue = (e) => {
    const { value, id } = e.target;

    this.setState({
      [id]: value,
      isRandom: false,
    });
  }

  getRandom = () => {
    this.setState(state => ({ isRandom: !state.isRandom }));
  }

  render() {
    const { todos, onSelectUser, onChengeStatus } = this.props;
    const { inputValue, selectValue, isRandom } = this.state;
    const availableTodos = filterTodos();

    function filterTodos() {
      if (isRandom) {
        const randomIndex = Math.floor(Math.random() * todos.length);

        return todos.filter(
          (_, index) => index > randomIndex - 10 && index < randomIndex,
        );
      }

      if (selectValue === 'Active') {
        return todos.filter(todo => !todo.completed);
      }

      if (selectValue === 'Completed') {
        return todos.filter(todo => todo.completed);
      }

      return todos.filter(todo => todo.title.includes(inputValue));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__sort">
          <input
            id="inputValue"
            className="input is-primary"
            type="text"
            placeholder="Enter todo"
            value={this.state.inputValue}
            onChange={e => this.changedValue(e)}
          />

          <button
            type="button"
            className={className(
              'button',
              'is-outlined',
              { 'is-primary': !isRandom },
              { 'is-danger': isRandom },
            )}
            disabled={
              inputValue !== ''
              || (selectValue !== ''
              && selectValue !== 'Choose status')
            }
            onClick={this.getRandom}
          >
            {isRandom ? 'Cancel random Todos' : 'Get random Todos'}
          </button>

          <div className="select is-primary" style={{ float: 'right' }}>
            <select
              id="selectValue"
              value={selectValue}
              onChange={e => this.changedValue(e)}
            >
              <option>Choose status</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {availableTodos.map(todo => (
              <li
                key={todo.id}
                className={className(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onChange={e => onChengeStatus(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  id={todo.userId}
                  className={className(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': !todo.completed },
                  )}
                  type="button"
                  onClick={e => onSelectUser(e)}
                >
                  {`User#${todo.userId}`}
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
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectUser: PropTypes.number.isRequired,
  onChengeStatus: PropTypes.func.isRequired,
};
