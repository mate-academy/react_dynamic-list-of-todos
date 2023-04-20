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

  loadUser = async () => {
    if (this.state.selectedUserId !== null) {
      // eslint-disable-next-line
      const user = await api.getUser(this.state.selectedUserId);

      this.setState({ user });
    }
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
    const lowQuery = query.toLowerCase().trim();
    let visibleTodos = [...todos];

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
      return this.setState({ query: event.target.value });
    };

    const handleQueryReset = () => {
      return this.setState({ query: '' });
    };

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
      return this.setState({ filter: event.target.value as FilterStatus });
    };

    const changeTodo = (todoId: number | null) => {
      this.setState({ selectedTodoId: todoId });
    };

    const changeUser = (userId: number | null) => {
      this.setState({ selectedUserId: userId });
    };

    const resetUser = () => {
      this.setState({ user: null });
    };

    if (query[0] === ' ') {
      this.setState({ query: '' });
    }

    if (filter === FilterStatus.active) {
      visibleTodos = todos.filter(
        (todo: Todo) => todo.completed === false,
      );
    }

    if (filter === FilterStatus.completed) {
      visibleTodos = todos.filter(
        (todo: Todo) => todo.completed === true,
      );
    }

    visibleTodos = visibleTodos.filter(
      (todo: Todo) => todo.title.toLocaleLowerCase().includes(lowQuery),
    );

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  query={query}
                  filter={filter}
                  handleChange={handleChangeQuery}
                  handleReset={handleQueryReset}
                  handleFilterChange={handleFilterChange}
                />
              </div>

              <div className="block">
                {todos.length < 1 && (
                  <Loader />
                )}
                {todos.length > 0 && (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    changeTodo={changeTodo}
                    changeUser={changeUser}
                  />
                )}
              </div>
            </div>
            {selectedUserId !== null && (
              <TodoModal
                todos={visibleTodos}
                selectedUser={user}
                selectedTodoId={selectedTodoId}
                changeTodo={changeTodo}
                changeUser={changeUser}
                loadUser={this.loadUser}
                resetUser={resetUser}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
