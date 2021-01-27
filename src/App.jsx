import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './app/loadTodos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then((todosFromServer) => {
        this.setState({
          todos: todosFromServer,
        });
      });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  checkHandler = (todoId) => {
    const todos = [...this.state.todos];
    const selectedTodo = todos.find(todo => todo.id === todoId);

    selectedTodo.completed = !selectedTodo.completed;
    this.setState(state => ({ todos }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            checkHandler={this.checkHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <div>
                <button
                  type="button"
                  className="App__clear-button"
                  onClick={() => {
                    this.setState({ selectedUserId: 0 });
                  }}
                >
                  Clear
                </button>
                <CurrentUser userId={selectedUserId} />
              </div>
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
