import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  state = {
    todos: this.props.todos,
    filteredTodos: this.props.todos,
    filter: '',
    isComplete: '',
  }

  componentDidMount() {
    this.setState({
      todos: this.props.todos,
    });
  }

  filterTodos = () => {
    this.setState(state => ({
      filteredTodos: state.todos.filter(todo => ((state.isComplete.length > 0)
        ? String(todo.completed) === state.isComplete
          && todo.title.includes(state.filter)
        : todo.title.includes(state.filter))),
    }));
  }

  shuffleTodos = () => {
    function shuffle(todos) {
      const newTodos = todos;
      let { length } = newTodos;

      while (length) {
        const randomIndex = Math.floor(Math.random() * (length -= 1));

        const lastIndex = newTodos[length];

        newTodos[length] = newTodos[randomIndex];
        newTodos[randomIndex] = lastIndex;
      }

      return newTodos;
    }

    this.setState(state => ({
      filteredTodos: [...shuffle(state.todos)],
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
    this.filterTodos();
  }

  render() {
    const { selectUser } = this.props;
    const { filteredTodos, filter, complete } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            <label>
              Filter by title:&nbsp;
              <input
                type="text"
                name="filter"
                value={filter}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Filter by active:&nbsp;
              <select
                name="isComplete"
                value={complete}
                onChange={this.handleChange}
              >
                <option value="">All todos</option>
                <option value="true">Completed todos</option>
                <option value="false">Not complete todos</option>
              </select>
            </label>

            <button
              className="TodoList__randomize"
              type="button"
              onClick={this.shuffleTodos}
            >
              Randomize
            </button>
            {filteredTodos.map((todo) => {
              const { id, userId, title } = todo;

              return (
                <li
                  className="TodoList__item TodoList__item--unchecked"
                  key={id}
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{title}</p>
                  </label>

                  <button
                    className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                    type="button"
                    onClick={() => {
                      selectUser(userId);
                    }}
                  >
                    User&nbsp;#
                    {userId}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  selectUser: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
