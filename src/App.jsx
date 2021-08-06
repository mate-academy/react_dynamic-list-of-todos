import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    todoId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
    // console.log(todos);
  }

  selectedTodo = (todoId) => {
    this.setState({ todoId });
  }

  render() {
    const { todos, todoId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList
              todos={todos}
              selectedTodoId={todoId}
              // eslint-disable-next-line
              selectedTodo={this.selectedTodo}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {todoId ? (
              <CurrentUser
                todoId={todoId}
                selectedTodo={this.selectedTodo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
