/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

type State = {
  todos: Todo[];
  query: string;
  status: Status;
  selectedTodo: Todo | null;
  user: User | null;
  loadingTodos: boolean;
  loadingUser: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    query: '',
    status: 'all',
    selectedTodo: null,
    user: null,
    loadingTodos: true,
    loadingUser: false,
  };

  componentDidMount() {
    getTodos().then(todos => {
      this.setState({
        todos,
        loadingTodos: false,
      });
    });
  }

  handleQueryChange = (query: string) => {
    this.setState({ query });
  };

  handleStatusChange = (status: Status) => {
    this.setState({ status });
  };

  handleClearSearch = () => {
    this.setState({ query: '' });
  };

  handleSelectTodo = (todo: Todo) => {
    this.setState({
      selectedTodo: todo,
      user: null,
      loadingUser: true,
    });

    getUser(todo.userId).then(user => {
      this.setState({
        user,
        loadingUser: false,
      });
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedTodo: null,
      user: null,
    });
  };

  render() {
    const {
      todos,
      query,
      status,
      selectedTodo,
      user,
      loadingTodos,
      loadingUser,
    } = this.state;

    const normalizedQuery = query.toLowerCase();

    const filteredTodos = todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  query={query}
                  status={status}
                  onQueryChange={this.handleQueryChange}
                  onStatusChange={this.handleStatusChange}
                  onClear={this.handleClearSearch}
                />
              </div>

              <div className="block">
                {loadingTodos ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelect={this.handleSelectTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            user={user}
            loading={loadingUser}
            onClose={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
