import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todosFromServer: [],
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        const initTodos = todos.filter(todo => todo.title);

        this.setState({
          todosFromServer: [...initTodos],
          todos: [...initTodos],
        });
      });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterTodos = (query) => {
    this.setState(state => ({
      todos: state.todosFromServer.filter(todo => todo.title.includes(query)),
    }));
  }

  filterCompleted = (value) => {
    switch (value) {
      case 'active':
        this.setState(state => ({
          todos: state.todosFromServer.filter(todo => !todo.completed),
        }));
        break;
      case 'completed':
        this.setState(state => ({
          todos: state.todosFromServer.filter(todo => todo.completed),
        }));
        break;
      default:
        this.setState(state => ({
          todos: state.todosFromServer,
        }));
    }
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectUser={this.selectUser}
            filterTodos={this.filterTodos}
            filterCompleted={this.filterCompleted}
          />
        </div>
        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={this.clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    );
  }
}

export default App;
