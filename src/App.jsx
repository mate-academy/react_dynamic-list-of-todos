import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAll } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todosFromServer: [],
    todosForFilter: [],
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount = async() => {
    const getTodos = await getAll();

    this.setState({
      todosFromServer: getTodos.data
        .filter(item => item.title && item.id && item.userId),

      todosForFilter: getTodos.data
        .filter(item => item.title && item.id && item.userId),

      todos: getTodos.data.filter(item => item.title && item.id && item.userId),

    });
  }

  handleSelect = (event) => {
    if (event === 'Completed') {
      this.setState(prevState => ({
        todos: prevState.todosFromServer.filter(item => item.completed),
        todosForFilter: prevState.todosFromServer
          .filter(item => item.completed),
      }));
    } else if (event === 'Not completed') {
      this.setState(prevState => ({
        todos: prevState.todosFromServer.filter(item => !item.completed),
        todosForFilter: prevState.todosFromServer
          .filter(item => !item.completed),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todosFromServer,
        todosForFilter: prevState.todosFromServer,
      }));
    }
  }

  handleFilter = (event) => {
    this.setState(prevState => ({
      todos: prevState.todosForFilter
        .filter(item => (item.title).includes(event)),
    }));
  }

  viewUser = (event) => {
    this.setState({
      selectedUserId: event,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  handleChecked = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            handleSelect={this.handleSelect}
            handleFilter={this.handleFilter}
            viewUser={this.viewUser}
            onChecked={this.handleChecked}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
