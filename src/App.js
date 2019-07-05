import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import NotLoaded from './components/NotLoaded/NotLoaded';

import './App.css';

class App extends Component {
  state = {
    todoList: [],
    sorted: [],
    isLoaded: false,
    isLoading: false,
    sortType: null,
    direction: 1,
  };

  fetchData = async() => {
    this.setState({ isLoading: true });

    const resUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await resUsers.json();

    const resTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
    let todos = await resTodos.json();
    todos = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })).slice(0, 100);

    this.setState({
      todoList: todos,
      sorted: todos,
      isLoading: false,
      isLoaded: true,
    });
  }

  sortData = (sortType) => {
    this.setState(state => ({
      sortType,
      direction: state.direction === 1 ? -1 : 1,
      sorted: [...state.todoList].sort((a, b) => {
        switch (sortType) {
          case 'name':
            console.log('sorted by name');
            return (
              state.direction * (a.user[sortType]
                .localeCompare(b.user[sortType]))
            );
          case 'completed':
            console.log('sorted by completed');
            return state.direction * (b[sortType] - a[sortType]);
          case 'title':
            console.log('sorted by title');
            return state.direction * a[sortType].localeCompare(b[sortType]);
          default: return 0;
        }
      }),
    }));
  }

  render() {
    return (
      <main className="container">
        <h1 className="container__header">Todo List</h1>
        {
          this.state.isLoaded
            ? (
              <TodoList
                sortFunction={this.sortData}
                state={this.state}
              />
            )
            : (
              <NotLoaded
                loadFunction={this.fetchData}
                isLoading={this.state.isLoading}
              />
            )
        }
      </main>
    );
  }
}

export default App;
