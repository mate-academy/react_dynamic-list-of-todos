import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './data/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then((result) => {
      this.setState({ todos: result.data });
    });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  changeTodoStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (id !== todo.id) {
          return todo;
        }

        return ({
          ...todo,
          completed: !todo.completed,
        });
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
            selectUser={this.selectUser}
            userId={selectedUserId}
            changeStatus={this.changeTodoStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
