import React from 'react';
import './App.scss';
import './styles/general.scss';
import Loader from 'react-loader-spinner';
import { TodoList } from './components/TodoList';
import * as getData from './api/api';
import { CurrentUser } from './components/CurrentUser';
import 'bulma';
import { LoadingError } from './components/LoadingError';

interface State {
  todos: Todo[],
  visibleTodos: Todo[],
  selectedUserId: number;
  isLoading: boolean;
  hasLoadingError: boolean;
  isInitialized: boolean;
}

let todosFromServer: Todo[] = [];

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    visibleTodos: [...todosFromServer],
    selectedUserId: 0,
    isLoading: false,
    hasLoadingError: false,
    isInitialized: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });
      todosFromServer = await getData.getTodos();

      this.setState({
        todos: todosFromServer,
        visibleTodos: [...todosFromServer],
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasLoadingError: true,
      });
    }
  }

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const {
      todos,
      visibleTodos,
      selectedUserId,
      isLoading,
      hasLoadingError,
      isInitialized,
    } = this.state;

    if (isLoading) {
      return (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
        />
      );
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          {(isInitialized && todos.length > 0) && (
            <TodoList
              todos={visibleTodos}
              selectUser={this.selectUser}
            />
          )}

          {hasLoadingError && (
            <LoadingError
              errorMessage="An error occured when loading todos!"
            />
          )}
        </div>

        {isInitialized && todos.length > 0 && (
          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={() => this.selectUser(0)}
                />
              ) : 'No user selected'}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
