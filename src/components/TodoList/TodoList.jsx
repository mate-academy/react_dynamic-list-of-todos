import React from 'react';
import PropTypes from 'prop-types'; 
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    listTodos: [...this.props.todos],
    filterValue: '',
    filterStateTodos: 'all',
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { selectedUserId, getSelectedUserId } = this.props;
    const { filterValue, listTodos, filterStateTodos } = this.state;
    const currentListTodos = [...this.state.listTodos].filter((elem) => {
      if (filterStateTodos === 'completed') {
        return elem.completed === true;
      }

      if (filterStateTodos === 'active') {
        return elem.completed === false;
      }

      return true;
    }).filter(item => (
      `${item.title}`.toLowerCase()
    ).includes(filterValue.toLowerCase()));

    const shuffleRandom = () => {
      let j,
        temp;
      const copyArr = [...listTodos];

      for (let i = copyArr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = copyArr[j];
        copyArr[j] = copyArr[i];
        copyArr[i] = temp;
      }

      this.setState({
        listTodos: copyArr,
      });
    };

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form>
          <input
            name="filterValue"
            value={filterValue}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={shuffleRandom}
          >
            go random sort
          </button>
          <select
            value={filterStateTodos}
            name="filterStateTodos"
            onChange={this.handleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {currentListTodos.map(todo => (
              <li
                className={`TodoList__item ${todo.userId === selectedUserId
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly="readonly"
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => getSelectedUserId(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
  })),
  getSelectedUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: null,
};
