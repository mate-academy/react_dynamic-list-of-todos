import React from 'react';
import PropTypes from 'prop-types'; 
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    listTodos: [...this.props.todos],
    filterList: [...this.props.todos],
    filterValue: '',
    filterStateTodos: 'all',
  }

  componentDidUpdate(prevProps, prevState) {
    const { filterStateTodos, filterValue } = this.state;

    if (prevState.filterStateTodos !== filterStateTodos
      || prevState.filterValue !== filterValue) {
      const newList = [...this.state.listTodos].filter((elem) => {
        if (filterStateTodos === 'completed') {
          return elem.completed === true;
        }

        if (filterStateTodos === 'active') {
          return elem.completed === false;
        }

        return true;
      }).filter(item => (`${item.title}`).includes(filterValue));

      this.setState({
        filterList: newList,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  shuffleRandom = () => {
    let j,
      temp;
    const copyArr = [...this.state.filterList];

    for (let i = copyArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = copyArr[j];
      copyArr[j] = copyArr[i];
      copyArr[i] = temp;
    }

    this.setState({
      filterList: copyArr,
    });
  };

  render() {
    const { selectedUserId, getSelectedUserId } = this.props;
    const { filterValue, filterList, filterStateTodos } = this.state;
    const currentListTodos = filterList;

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
            onClick={this.shuffleRandom}
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
