import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos: todos.data });
      });
  }

  handleClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleCheckTask = (taskId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== taskId) {
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
            checkTask={this.handleCheckTask}
            selectUser={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.handleClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
