/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type State = {
  todos: Todo[];
  selectedTodo: Todo | null;
  selectedUser: User | null;
  isLoading: boolean;
  isLoadingUser: boolean;
  status: string;
  query: string;
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    todos: [],
    selectedTodo: null,
    selectedUser: null,
    isLoading: true,
    isLoadingUser: false,
    status: 'all',
    query: '',
  };

  componentDidMount() {
    getTodos().then(todos => {
      this.setState({
        todos,
        isLoading: false,
      });
    });
  }

  selectTodo = (todo: Todo) => {
    this.setState({
      selectedTodo: todo,
      selectedUser: null,
      isLoadingUser: true,
    });

    import('./api').then(({ getUser }) => {
      getUser(todo.userId).then(user => {
        this.setState({
          selectedUser: user,
          isLoadingUser: false,
        });
      });
    });
  };

  closeModal = () => {
    this.setState({
      selectedTodo: null,
      selectedUser: null,
    });
  };

  setStatus = (status: string) => {
    this.setState({ status });
  };

  setQuery = (query: string) => {
    this.setState({ query });
  };

  clearQuery = () => {
    this.setState({ query: '' });
  };

  getFilteredTodos() {
    const { todos, status, query } = this.state;

    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }

  render() {
    const {
      selectedTodo,
      selectedUser,
      isLoading,
      isLoadingUser,
      status,
      query,
    } = this.state;

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  status={status}
                  query={query}
                  onStatusChange={this.setStatus}
                  onQueryChange={this.setQuery}
                  onClearQuery={this.clearQuery}
                />
              </div>

              <div className="block">
                {isLoading ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={this.getFilteredTodos()}
                    selectedTodoId={selectedTodo?.id ?? null}
                    onSelect={this.selectTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            user={selectedUser}
            isLoading={isLoadingUser}
            onClose={this.closeModal}
          />
        )}
      </>
    );
  }
}
