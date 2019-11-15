import React, { Component } from 'react';
import './App.css';
import Load from './components/Load';
import TodoTable from './components/TodoTable';
import data from './components/Api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTable: null,
      loading: false,
    };
  }

  showList = async() => {
    this.setState({

      loading: true,
    });
    const [todos, users] = await data();
    const todoList = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId).name,
    }));
    this.setState({
      visibleTable: todoList,
    });
  };

  sortTodos = (val) => {
    this.setState(prevState => ({
      ...prevState,
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

    if (!this.state.visibleTable) {
      if (loading) {
        return <button className="ui loading primary button">Loading</button>;
      }
      return <Load showList={this.showList} />;
    }
    return (
      <TodoTable
        visibleTable={this.state.visibleTable}
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
