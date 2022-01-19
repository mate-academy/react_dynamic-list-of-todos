import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { LoadingError } from './components/LoadingError';

interface State {
  selectedUserId: number;
  todos: Todo[];
  hasLoadingError: boolean;
  error: string;
  query: string;
  completionStatus: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    hasLoadingError: false,
    error: '',
    query: '',
    completionStatus: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos, hasLoadingError: false, error: '' });
      })
      .catch(() => {
        this.setState({ hasLoadingError: true, error: 'an error occurred when loading todos' });
      });
  }

  selectUser = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ completionStatus: event.target.value });
  };

  randomize = (todos: Todo[]) => {
    for (let i = todos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = todos[i];

      // eslint-disable-next-line no-param-reassign
      todos[i] = todos[j];
      // eslint-disable-next-line no-param-reassign
      todos[j] = temp;
    }

    return todos;
  };

  handleRandomize = () => {
    this.setState((state) => ({
      todos: this.randomize(state.todos),
    }));
  };

  render() {
    const {
      selectedUserId, todos, hasLoadingError, error, query, completionStatus,
    } = this.state;

    const foundTodos = (query !== '')
      ? todos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      )
      : todos;

    let visibleTodos = (completionStatus === 'active')
      ? foundTodos.filter(todo => todo.completed === true)
      : foundTodos.filter(todo => todo.completed === false);

    if (completionStatus === 'all') {
      visibleTodos = foundTodos;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          { hasLoadingError
            ? (
              <LoadingError error={error} />
            )
            : (
              <>
                <div className="App__buttons">
                  <input
                    type="text"
                    className="App__button button-input"
                    placeholder="Enter the title of the todo"
                    value={query}
                    onChange={this.handelChange}
                  />

                  <select
                    name="completionStatus"
                    className="App__button button-select"
                    value={completionStatus}
                    onChange={this.handleChangeSelect}
                  >
                    <option value="all">all</option>
                    <option value="active">active</option>
                    <option value="completed">completed</option>
                  </select>

                  <button
                    type="button"
                    className="App__button button-random"
                    onClick={() => this.handleRandomize()}
                  >
                    Randomize
                  </button>

                </div>
                <TodoList
                  todos={visibleTodos}
                  selectedUserId={selectedUserId}
                  selectUser={this.selectUser}
                />
              </>
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
