import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState(prevState => ({
      todos: [...prevState.todos, ...this.validateTodos(todos)],
    }));
  }

  selectUser = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodoId: todoId,
    });
  }

  validateTodos = todos => todos.filter(todo => todo.userId
        && todo.id
        && todo.title
        && typeof todo.completed === 'boolean')

  render() {
    const { todos, selectedUserId, selectedTodoId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedTodoId={selectedTodoId}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
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
