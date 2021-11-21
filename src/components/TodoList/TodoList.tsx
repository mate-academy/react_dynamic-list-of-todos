import React from 'react';
import { API } from '../../utils/api';
import './TodoList.scss';
import { TodoListHeader } from './TodoListHeader';
import { TodoListItem } from './TodoListItem';
import { Status } from '../../types/FilterStatus';

type Props = {
  setSelectedId: (userId: number) => void;
};

type State = {
  todos: Todo[];
  query: string;
  status: Status;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    status: Status.all,
  };

  componentDidMount() {
    API.getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  handleChange = (value: string, name: string) => {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  filterTodos = (status = Status.all) => {
    const query = this.state.query.toLowerCase();

    return this.state.todos.filter(todo => {
      const todoTitle = todo.title.toLowerCase();

      switch (status) {
        case Status.completed:
          return todoTitle.includes(query) && todo.completed;

        case Status.notCompleted:
          return todoTitle.includes(query) && !todo.completed;

        case Status.all:
        default:
          return todoTitle.includes(query);
      }
    });
  };

  render() {
    const { setSelectedId } = this.props;
    const { query, status } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <TodoListHeader
          filterTodos={this.filterTodos}
          query={query}
          status={status}
          handleChange={this.handleChange}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.filterTodos(status).map(todo => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                setSelectedId={setSelectedId}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
