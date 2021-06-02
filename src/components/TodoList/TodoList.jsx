import React from 'react';
import './TodoList.scss';
import propTypes from 'prop-types';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  state = {
    formmatedTodos: [],
    isRandom: false,
    statusFilter: 0,
    searchQuarry: '',
  }

  componentDidMount() {
    this.setState({ formmatedTodos: [...this.props.todos] });
  }

  randomizeTodos() {
    this.setState({ isRandom: true });
  }

  render() {
    const { isRandom, searchQuarry, statusFilter } = this.state;
    let { formmatedTodos } = this.state;
    const { selectUser } = this.props;

    if (isRandom) {
      formmatedTodos.sort(() => Math.random() - Math.random());
      this.setState({ isRandom: false });
    }

    if (!searchQuarry.length !== 0) {
      formmatedTodos = formmatedTodos.filter(({ title }) => {
        if (title !== null) {
          return title.toLowerCase().includes(searchQuarry.toLowerCase());
        }

        return false;
      });
    }

    if (statusFilter !== 0) {
      formmatedTodos = (statusFilter === 1)
        ? formmatedTodos.filter(todo => !todo.completed)
        : formmatedTodos.filter(todo => todo.completed);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            placeholder="todo title"
            value={this.state.searchQuarry}
            onChange={
              event => this.setState({ searchQuarry: event.target.value })
            }
          />
          <select
            value={this.state.statusFilter}
            onChange={
              event => this.setState({ statusFilter: +event.target.value })}
          >
            <option value={0}>status</option>
            <option value={1}>in progress</option>
            <option value={2}>completed</option>
          </select>
          <button
            className="button"
            type="button"
            onClick={() => this.randomizeTodos()}
          >
            Randomize
          </button>
          <ul className="TodoList__list">
            {
              formmatedTodos.map(
                todo => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    selectUser={selectUser}
                  />
                ),
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      title: propTypes.string.isRequired,

    }),
  ).isRequired,
  selectUser: propTypes.func.isRequired,
};
