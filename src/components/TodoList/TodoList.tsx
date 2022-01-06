import React from 'react';
import './TodoList.scss';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
};

type State = {
  title: string,
  visibleTodos: Todo[],
};

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    visibleTodos: this.props.todos,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.todos !== this.props.todos) {
      this.state.visibleTodos = this.props.todos;
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case ('active'):
        this.setState(({
          visibleTodos: this.props.todos.filter(todo => !todo.completed),
        }));
        break;
      case ('completed'):
        this.setState(({
          visibleTodos: this.props.todos.filter(todo => todo.completed),
        }));
        break;
      default:
        this.setState({ visibleTodos: this.props.todos });
        break;
    }
  };

  filterTitle = () => {
    return (
      this.state.visibleTodos.filter(todo => (
        todo.title.toLowerCase().includes(this.state.title.toLowerCase())
      ))
    );
  };

  render() {
    const searchedTodos = this.filterTitle();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__filter">
          Filter Todos By Title:
          <input
            className="TodoList__filter-search"
            type="text"
            placeholder="enter title to search"
            value={this.state.title}
            onChange={this.handleInputChange}
          />

          <select onChange={this.handleSelectChange}>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {searchedTodos.map(todo => (
              <li
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
                key={todo.id}
              >
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
                <button
                  className={todo.userId === this.props.selectedUserId
                    ? 'TodoList__user-button--selected button'
                    : 'TodoList__user-button button'}
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
