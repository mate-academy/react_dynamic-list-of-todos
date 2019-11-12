import React, { Component } from 'react';
import './App.css';
import Load from './components/Load';
import TodoTable from './components/TodoTable';
import data from './components/Api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalTable: null,
      visibleTable: null,
      isStarted: false,
      loading: false,
      todos: [],
      users: null,
    };
  }

  showList = async() => {
    this.setState({
      isStarted: true,
      loading: true,
    });
    const [todos, users] = await data();
    const todoList = todos.map(todo => ({
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      user: users.find(user => user.id === todo.userId).name,
    }));
    this.setState({
      originalTable: todoList,
      visibleTable: todoList,
      users: todoList.users,
    });
  };

  sortTodos = (val) => {
    this.setState(prevState => ({
      visibleTable: prevState.visibleTable.sort((a, b) => {
        switch (val) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'user':
            return a.user.localeCompare(b.user);
          default:
            return a.completed - b.completed;
        }
      }),
    }));
  }

  rendering = () => {
    const { loading } = this.state;

    if (this.state.originalTable === null) {
      if (loading) {
        return <button className="ui loading primary button">Loading</button>;
      }
      return <Load showList={this.showList} />;
    }
    return (
      <TodoTable
        originalTable={this.state.originalTable}
        byTitle={() => this.sortTodos('title')}
        byUser={() => this.sortTodos('user')}
        byCompleteness={() => this.sortTodos('completed')}
      />
    );
  }

  render() {
    return (
      <div className="wrapper">{this.rendering()}</div>
    );
  }
}
export default App;
