import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import LoadButton from './components/LoadButton/LoadButton';
import fetchData from './components/fetchData';

import './App.css';

class App extends Component {
  state = {
    todoList: [],
    sortedTodoList: [],
    isLoaded: false,
    isLoading: false,
    sortType: '',
    direction: 1,
  };

  getTodos = async() => {
    this.setState({ isLoading: true });
    const currentTodos = await fetchData();
    this.setState({
      todoList: currentTodos,
      sortedTodoList: currentTodos,
      isLoading: false,
      isLoaded: true,
    });
  }

  sortData = (sortType) => {
    this.setState(state => ({
      sortType,
      direction: state.direction === 1 ? -1 : 1,
      sortedTodoList: [...state.todoList].sort((a, b) => {
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
      sortType: '',
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
            ) : (
              <LoadButton
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
