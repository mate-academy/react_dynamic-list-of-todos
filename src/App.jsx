import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    todoId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    const { todos, selectedUserId, todoId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList
              todos={todos}
              selectedTodoId={todoId}
              // eslint-disable-next-line
              selectedTodo={(todoId) => {
                this.setState({ todoId });
              }}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
