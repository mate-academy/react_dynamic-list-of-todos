import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './types/Todo';
import { getTodos } from './api/api';
import { User } from './types/User';

type State = {
  todos: Todo[] | null;
  selectedUserId: number;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: null,
    selectedUserId: 0,
  };

  async componentDidMount() {
    try {
      const todos: Todo[] = await getTodos();

      this.setState({
        todos,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('An error has occurred when loading todos from the server');
    }
  }

  selectUser = (newSelectedUserId: User['id']) => {
    this.setState({
      selectedUserId: newSelectedUserId,
    });
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos && (
            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              onSelect={this.selectUser}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : (
              'No user selected'
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
