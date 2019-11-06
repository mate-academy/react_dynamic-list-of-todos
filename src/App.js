import React, { Component } from 'react';
import './App.css';
import Load from './components/Load';
import TodoTable from './components/TodoTable';
import data from './components/Api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialTable: null,
      currentTable: null,
      isStarted: false,
      loading: false,
      todos: null,
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
      initialTable: todoList,
      currentTable: todoList,
      users: todoList.users,
    });
  };

  sortTodos = (val) => {
    this.setState(prevState => ({
      ...prevState,
      currentTable: prevState.currentTable.sort((a, b) => {
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
    const { todos, users, loading } = this.state;

    if (users === null && todos === null) {
      if (loading) {
        return <button className="ui loading primary button">Loading</button>;
      }
      return <Load showList={this.showList} />;
    }
    return (
      <TodoTable
        initialTable={this.state.initialTable}
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
