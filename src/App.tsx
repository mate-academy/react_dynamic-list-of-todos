import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  randomizeTodosOrder = () => {
    const { todos } = this.state;

    const suffeledTodos = [...todos];

    for (let i = suffeledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [suffeledTodos[i], suffeledTodos[j]] = [suffeledTodos[j], suffeledTodos[i]];
    }

    this.setState({ todos: suffeledTodos });
  };

  render() {
    const {
      selectedUserId,
      todos,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!!todos.length && (
            <TodoList
              todos={todos}
              onSelectUser={this.selectUser}
              onRandomize={this.randomizeTodosOrder}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUserInfo={this.clearSelectedUser}
              />
            ) : (
              <div className="alert alert-primary" role="alert">
                No user selected
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
