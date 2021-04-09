import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FormFilter } from '../FormFilter';

export class TodoList extends React.PureComponent {
  state = {
    selectValue: 'all',
    inputValue: '',
  };

  handleChange = (handleEvent) => {
    const { value } = handleEvent.target;

    this.setState({
      inputValue: value,
    });
  }

  filteredTodos(todos) {
    const { inputValue, selectValue } = this.state;

    switch (selectValue) {
      case 'Active':
        return todos.filter(todo => todo.completed);
      case 'Complited':
        return todos.filter(todo => !(todo.completed));
      default:
        return todos.filter(todo => todo.title.includes(inputValue));
    }
  }

  render() {
    const { todos, selectUser, stateUserId } = this.props;

    const visibleTodos = this.filteredTodos(todos);

    return (
      <>
        <div className="TodoList">
          <h2>Todos:</h2>

          <FormFilter
            onHandleChange={this.handleChange}
            changeSelectValue={(event) => {
              this.setState({
                selectValue: event.target.value,
              });
            }}
            inputValue={this.state.inputValue}
          />

          <div className="TodoList__list-container">
            <ul className="TodoList__list">

              {visibleTodos.map(todo => (
                <>
                  <li
                    key={todo.id}
                    className={classnames(
                      'TodoList__item',
                      { 'TodoList__item--checked': todo.completed },
                      { 'TodoList__item--unchecked': !todo.completed },
                    )}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className={classnames('button', {
                        'TodoList__user-button--selected':
                        stateUserId === todo.userId,
                      })}
                      type="button"
                      onClick={() => {
                        selectUser(todo.userId);
                      }}
                    >
                      {`User# ${todo.userId}`}
                    </button>
                  </li>
                </>

              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

TodoList.propTypes = PropTypes.shape({
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  selectUser: PropTypes.func.isRequired,
  stateUserId: PropTypes.number.isRequired,
}).isRequired;
