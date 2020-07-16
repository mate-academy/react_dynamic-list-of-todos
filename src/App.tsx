import React, { Component } from 'react';
import './App.css';
import { Todo, User, Sorting } from './Components/interfaces/interfaces';
import { loadData } from './Components/api/api';
import { URL_TODOS, URL_USERS, noUser } from './Components/constant/constants';
import { Button } from './Components/LoadButton/LoadButton';
import { TodoList } from './Components/TodoList/TodoList';
import { FilterButtons } from './Components/FilterButtons/FilterButtons';

interface State {
  todosList: Todo[];
  isLoad: boolean;
  isLoading: boolean;
}

export class App extends Component<{}, State> {
  state: State = {
    todosList: [],
    isLoad: false,
    isLoading: false,
  };

  onLoadData = async () => {
    this.setState({
      isLoading: true,
    });

    const todos = await loadData<Todo>(URL_TODOS);
    const users = await loadData<User>(URL_USERS);

    this.setState({
      todosList: this.preparedTodos(todos, users),
      isLoad: true,
      isLoading: false,
    });
  };

  private preparedTodos = (todos: Todo[], users: User[]) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || noUser,
    }));
  };

  onFilterTodos = (sortingPattern: Sorting) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.sort(sortingPattern),
    }));
  };

  render() {
    const { isLoad, todosList, isLoading } = this.state;
    const { onFilterTodos } = this;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>

        {!isLoad && (
          <Button
            title={isLoading ? 'Loading...' : 'Load'}
            onLoadData={this.onLoadData}
          />
        )}

        {isLoad && (
          <>
            <FilterButtons onFilterTodos={onFilterTodos} />
            <TodoList todosList={todosList} />
          </>
        )}
      </>
    );
  }
}
