import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then((data) => {
      this.setState({ todos: data.data });
    });
  }

  selectedUserId = (selectedUserId) => {
    this.setState({
      selectedUserId,
    });
  }

  randomize = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort(() => 0.5 - Math.random()),
    }));
  }

  checkOnCompletedTodos = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
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
            selectUser={this.selectedUserId}
            randomize={this.randomize}
            checkOnCompletedTodos={this.checkOnCompletedTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                selectUser={this.selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
