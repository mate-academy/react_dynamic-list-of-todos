import React, { Component } from 'react';
import { loadTodos, loadUsers } from './helper/Helper';
import TodoList from './todolist/TodoList';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    tableList: [],
    sortMethod: 'Reset',
  }

  loadTableList = async() => {
    this.setState({
      loading: true,
    });

    Promise.all([loadTodos(), loadUsers()])
      .then(([todoList, userList]) => {
        const tableList = todoList.map(todo => ({
          ...todo,
          user: userList.find(item => item.id === todo.userId),
        }));
        this.setState({ tableList });
      });
  }

  onSort = (sortMethod) => {
    this.setState({
      sortMethod,
    });
  }

  render() {
    const { loading, tableList, sortMethod } = this.state;
    if (!tableList.length) {
      if (loading) {
        return (
          <button
            type="button"
            className="ui loading button"
          />
        );
      }
      return (
        <button
          type="button"
          className="ui labeled icon button"
          onClick={this.loadTableList}
        >
          <i className="right arrow icon" />
          Load User
        </button>
      );
    } return (
      <TodoList
        table={this.state.tableList}
        onSort={this.onSort}
        sortMethod={sortMethod}
      />
    );
  }
}

export default App;
