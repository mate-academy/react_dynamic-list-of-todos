import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: null,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.data,
        });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({
      selectedUserId,
    });
  }

  handleChecked = (todoId) => {
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

  randomizeTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort(() => Math.random() - 0.5),
    }));
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
            handleChecked={this.handleChecked}
            randomizeTodos={this.randomizeTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
