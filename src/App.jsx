import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllToodos, selectedUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllToodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  onToggleToDo = (event, todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo)),
    }));
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: '',
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            onToggleToDo={this.onToggleToDo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                showUser={selectedUser}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
