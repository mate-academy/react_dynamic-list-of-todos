import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    input: '',
    filterOption: 'All',
  }

  inputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  selectChangeHadler = (event) => {
    this.setState({ filterOption: event.target.value });
  }

  filterTodos = (todos) => {
    const { input, filterOption } = this.state;
    const filteredTodosByTitle = todos.filter((todo) => {
      if (todo.title) {
        return todo.title.includes(input);
      }

      return false;
    });

    switch (filterOption) {
      case 'Active':
        return filteredTodosByTitle.filter(todo => !todo.completed);
      case 'Completed':
        return filteredTodosByTitle.filter(todo => todo.completed);
      default:
        return filteredTodosByTitle;
    }
  }

  render() {
    const { todos, selectedUserChanger, currentUserId } = this.props;
    const { input, filterOption } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          name="input"
          value={input}
          placeholder="Search by title"
          onChange={this.inputChangeHandler}
        />

        <select
          name="select"
          value={filterOption}
          onChange={this.selectChangeHadler}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(todos).map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                        todo.userId === currentUserId,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    selectedUserChanger(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const TodosType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  }),
);

TodoList.propTypes = {
  todos: TodosType.isRequired,
  selectedUserChanger: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
};
