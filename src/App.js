import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import NotLoaded from './components/NotLoaded/NotLoaded';
import fetchData from './components/fetchData';

import './App.css';

class App extends Component {
  state = {
    todoList: null,
    sorted: null,
    isLoaded: false,
    isLoading: false,
    sortType: null,
    direction: 1,
  };

  getTodos = async() => {
    this.setState({ isLoading: true });
    const currentTodos = await fetchData();
    this.setState({
      todoList: currentTodos,
      sorted: currentTodos,
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
            return (
              state.direction * (a.user[sortType]
                .localeCompare(b.user[sortType]))
            );
          case 'completed':
            return state.direction * (b[sortType] - a[sortType]);
          case 'title':
            return state.direction * a[sortType].localeCompare(b[sortType]);
          default: return 0;
        }
      }),
    }));
  }

  clearSorting = () => {
    this.setState(state => ({
      sortType: null,
      direction: 1,
      sorted: state.todoList,
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
                clearFunction={this.clearSorting}
                sortFunction={this.sortData}
                state={this.state}
              />
            )
            : (
              <NotLoaded
                loadFunction={this.getTodos}
                isLoading={this.state.isLoading}
              />
            )
        }
      </main>
    );
  }
}

export default App;
