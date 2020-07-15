import React, { Component } from 'react';
import './App.css';
import { Todo, User } from './Components/interfaces/interfaces';
import { loadData } from './Components/api/api';
import { URL_TODOS, URL_USERS } from './Components/constant/constants';
import { LoadButton } from './Components/LoadButton/LoadButton';
import { TodoList } from './Components/TodoList/TodoList';

interface State {
  todosList: Todo[];
  isLoad: boolean;
}

export class App extends Component<{}, State> {
  state: State = {
    todosList: [],
    isLoad: false,
  };

  onLoadData = async () => {
    const todos = await loadData<Todo>(URL_TODOS);
    const users = await loadData<User>(URL_USERS);

    this.setState({
      todosList: this.preparedTodos(todos, users),
      isLoad: true,
    });
  };

  private preparedTodos = (todos: Todo[], users: User[]) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  render() {
    const { isLoad, todosList } = this.state;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>

        {isLoad && (
          <TodoList todosList={todosList} />
        )}

        {!isLoad && (
          <LoadButton
            onLoadData={this.onLoadData}
          />
        )}
      </>
    );
  }
}
