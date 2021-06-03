import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const shuffle = (array) => {

  const randomArray = array;
  let i = randomArray.length - 1;

  while (i) {
    // eslint-disable-next-line
    const j = Math.floor(Math.random() * i);
    const result = randomArray[i];
    randomArray[i] = randomArray[j];
    randomArray[j] = result;
    i--;
  }
}

export class TodoList extends React.Component {
  state = {
    completedTodos: 'All',
    title: '',
    randomTodos: [],
  };

  completedTodos = (todos) => {
    switch (this.state.completedTodos) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleRandomizer = () => {
    const { todos } = this.props;

    this.setState({ randomTodos: shuffle(todos) });
  }

  render() {
    const { todos } = this.props;
    const { title, completedTodos, isRandom } = this.state;

    let preparedTodos = this.completedTodos([...todos]);

    if (isRandom) {
      preparedTodos = this.shuffle(preparedTodos);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          name="title"
          placeholder="Enter todo title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          value={completedTodos}
          name="completedTodos"
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Active</option>
        </select>
        <button
          type="button"
          className="button"
          onClick={this.handleRandomizer}
        >
          Randomize
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {preparedTodos
              .filter(todo => todo.title
                && (todo.title).includes(title))
              .map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })
                  }
                >
                  <label>
                    {todo.completed ? (
                      <input type="checkbox" checked readOnly />
                    ) : (
                      <input type="checkbox" disabled />
                    )}

                    <p>{todo.title}</p>
                  </label>
                  <button
                    className={classNames('button TodoList__user-button', {
                      // eslint-disable-next-line
                      'TodoList__user-button--selected': todo.userId === this.props.selectedUserId,
                    })}
                    type="button"
                    onClick={() => {
                      this.props.onSelectUser(todo.userId);
                    }}
                  >
                    User #
                    {todo.userId}
                  </button>
                </li>
              ))}

          </ul>
        </div>
      </div>
    );
  }
}

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: 0,
    title: '',
    completed: false,
  })),
  selectedUserId: 0,
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  onSelectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
};
