import React from 'react';
import './TodoList.scss';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  preparedTodos: Todo[];
  selectUser: (id: number | null) => void;
  selectedUserId: number | null;
  completeToggle: (todo: Todo) => void;
};

type State = {
  titleFilter: string,
  selected: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    titleFilter: '',
    selected: 'all',
  };

  shuffle = () => {
    this.props.preparedTodos.sort(() => Math.random() - 0.5);
    this.setState({});
  };

  reset = () => {
    this.setState({ selected: 'all', titleFilter: '' });
    this.props.preparedTodos.sort((a, b) => a.id - b.id);
  };

  changeToggler = (
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'selected') {
      this.setState({ selected: value });
    }

    if (name === 'titleFilter') {
      this.setState({ titleFilter: value });
    }
  };

  render() {
    const {
      selectedUserId,
      preparedTodos,
      selectUser,
      completeToggle,
    } = this.props;

    const { titleFilter, selected } = this.state;

    let filteredTodos = preparedTodos.filter(
      (todo) => todo.title.toLowerCase().includes(titleFilter.toLowerCase()),
    );

    switch (selected) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            name="titleFilter"
            value={this.state.titleFilter}
            onChange={this.changeToggler}
          />

          <select
            name="selected"
            onChange={this.changeToggler}
            value={this.state.selected}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>

          <button
            type="button"
            onClick={this.shuffle}
          >
            shuffle
          </button>

          <button
            type="button"
            onClick={this.reset}
          >
            reset
          </button>

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <TodoItem
                todo={todo}
                completeToggle={completeToggle}
                userId={selectedUserId}
                selectUser={selectUser}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
