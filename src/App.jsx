import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { requestTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todosList = await requestTodos();

    this.setState({ todos: todosList });
  }

  chooseUser = (userId) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({ selectedUserId: +userId });
    }
  }

  checkboxCompletedHandler = (taskId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === taskId) {
          return ({
            ...todo,
            completed: !todo.completed,
          });
        }

        return {
          ...todo,
        };
      }),
    }));
  }

  userClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            chooseUser={this.chooseUser}
            selectedUser={selectedUserId}
            checkboxHandler={this.checkboxCompletedHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.userClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
