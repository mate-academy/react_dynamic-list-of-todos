import React from 'react';
import './App.css';

import { fetchTodos, fetchUsers } from './components/api/Fetching';
import TodoList from './components/todoList/TodoList';
import Buttons from './components/buttons/Buttons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      todoList: [],
    }
  }

  loadData = () => {
    this.setState({
      loading: true,
    });

    Promise.all([fetchTodos(), fetchUsers()])
      .then(([todosItems, usersItems]) => {
        const todoList = todosItems.map(todo => ({
          ...todo,
          user: usersItems.find(user => user.id === todo.userId),
        }));

        this.setState({
          todoList,
          loading: false,
        });
      });
  };

  getSortMethod = (sort) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.sort((a, b) => {
        switch (sort) {
          case 'User':
            return a.user.name.localeCompare(b.user.name);
          case 'Completed':
            return b.completed - a.completed;
          default:
            return a.title.localeCompare(b.title);
        }
      }),
    }));
  };

  render() {
    const { todoList, loading } = this.state;

    if (!todoList.length) {
      if (loading) {
        return (
          <button
            className="ui basic loading button"
          onClick={this.loadData}
          />
        );
      } else {
        return (
          <button
            className="ui button"
            onClick={this.loadData}
          >
            Load Todo
          </button>
        );
      }
    }

    return (
      <>
        <Buttons todos={todoList} sort={this.getSortMethod} />
        <TodoList todos={todoList} />
      </>
    );
  }
}

export default App;
