import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env.d';
import { getTodos } from './api';

type State = {
  selectedUserId: number,
  todos: Todo[],
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({
      todos: todosFromServer,
    });
  }

  selectUserId = (userId: number) => {
    this.setState(state => ({
      ...state,
      selectedUserId: userId,
    }));
  };

  changeTodoStatus = (todoId: number) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    this.setState(() => ({
      todos: newTodos,
    }));
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUserId}
            selectedId={selectedUserId}
            changeTodoStatus={this.changeTodoStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser selectedId={selectedUserId} selectUser={this.selectUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
