/* eslint-disable max-len */
import React, { ChangeEvent } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterStatus } from './types/FilterStatus';
import { TodoFilter } from './components/TodoFilter';
import * as api from './api';

type State = {
  todos: Todo[],
  user: User | null,
  query: string,
  filter: FilterStatus,
  selectedTodoId: number | null,
  selectedUserId: number | null,
};

export class App extends React.Component<{}, State> {
  state = {
    todos: [],
    user: null,
    query: '',
    filter: FilterStatus.all,
    selectedTodoId: null,
    selectedUserId: null,
  };

  async componentDidMount() {
    const todos = await api.getTodos();

    this.setState({ todos });
  }

  componentDidUpdate() {
    if (this.state.query[0] === ' ') {
      this.setState({ query: '' });
    }
  }

  loadUser = async () => {
    if (this.state.selectedUserId !== null) {
      // eslint-disable-next-line
      const user = await api.getUser(this.state.selectedUserId);

      this.setState({ user });
    }
  };

  handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    return this.setState({ query: event.target.value });
  };

  handleQueryReset = () => {
    return this.setState({ query: '' });
  };

  handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    return this.setState({ filter: event.target.value as FilterStatus });
  };

  changeTodo = (todoId: number | null) => {
    this.setState({ selectedTodoId: todoId });
  };

  changeUser = (userId: number | null) => {
    this.setState({ selectedUserId: userId });
  };

  resetUser = () => {
    this.setState({ user: null });
  };

  updateTodos = () => {
    let visibleTodos = [...this.state.todos];

    if (this.state.filter === FilterStatus.active) {
      visibleTodos = this.state.todos.filter(
        (todo: Todo) => todo.completed === false,
      );
    }

    if (this.state.filter === FilterStatus.completed) {
      visibleTodos = this.state.todos.filter(
        (todo: Todo) => todo.completed === true,
      );
    }

    visibleTodos = visibleTodos.filter(
      (todo: Todo) => todo.title.toLocaleLowerCase().includes(this.state.query.toLowerCase().trim()),
    );

    return visibleTodos;
  };

  render() {
    const {
      todos,
      user,
      query,
      filter,
      selectedTodoId,
      selectedUserId,
    } = this.state;

    return (
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                handleChange={this.handleChangeQuery}
                handleReset={this.handleQueryReset}
                handleFilterChange={this.handleFilterChange}
              />
            </div>

            <div className="block">
              {todos.length ? (
                <TodoList
                todos={this.updateTodos()}
                selectedTodoId={selectedTodoId}
                changeTodo={this.changeTodo}
                changeUser={this.changeUser}
              />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          {selectedUserId && (
            <TodoModal
              todos={this.updateTodos()}
              selectedUser={user}
              selectedTodoId={selectedTodoId}
              changeTodo={this.changeTodo}
              changeUser={this.changeUser}
              loadUser={this.loadUser}
              resetUser={this.resetUser}
            />
          )}
        </div>
      </div>
    );
  }
}
