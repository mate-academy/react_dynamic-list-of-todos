import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    status: '',
    todos: this.props.todos,
    title: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos !== this.props.todos) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ todos: this.props.todos });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title': {
        this.setState({
          [name]: value, todos: this.props.todos, status: 'all',
        });
        break;
      }

      default: {
        this.setState((state) => {
          if (value === 'all') {
            return {
              [name]: value,
              todos: this.props.todos,
              title: ' ',
            };
          }

          const status = JSON.parse(value.toLowerCase());

          return {
            [name]: status,
            title: '',
            todos: [...this.props.todos
              .filter(todo => todo.completed === status)],
          };
        });
      }
    }
  }

  handleBlur = (event) => {
    const { value } = event.target;

    this.setState({ todos: this.props.todos.filter(todo => todo.title !== null
      && (todo.title.includes(value) === true)) });
  }

  handleRandom = () => {
    const tempArray = [...this.props.todos];

    for (let i = tempArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tempArray[i];

      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }

    this.setState({ todos: tempArray });
  }

  render() {
    const { onSelecUser, selectedUserId } = this.props;
    const { todos } = this.state;

    return (
      <div className="TodoList">
        <h2>List of Todos:</h2>
        <div className="TodoList__list-container">
          <button
            type="button"
            className="Randomize"
            onClick={this.handleRandom}
          >
            Randomize
          </button>
          <label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Filter by title"
              onChange={this.handleChange}
              onBlur={this.handleBlur}

            />
          </label>
          <select
            name="status"
            value={this.state.status}
            onChange={this.handleChange}
          >
            <option value="">Choose status</option>
            <option value="all">All</option>
            <option value="true">Active</option>
            <option value="false">Completed</option>
          </select>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                {selectedUserId === todo.userId ? (
                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                    type="button"
                    onClick={() => {
                      onSelecUser(0);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                ) : (
                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--unselected
                    button"
                    type="button"
                    onClick={() => {
                      onSelecUser(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )}
              </li>

            ))}
          </ul>
        </div>
      </div>
    );
  }
}
TodoList.defaultProps = {
  todos: [],
  onSelecUser: null,
  selectedUserId: null,
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onSelecUser: PropTypes.func,
  selectedUserId: PropTypes.number,
};
