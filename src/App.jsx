/* eslint-disable */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma/css/bulma.css';
import classnames from 'classnames';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { LoadingError } from './components/LoadingError/LoadingError';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    query: '',
    selectedStatus: '',
    loading: false,
    hasLoadingError: false,
    option: '',
  };

  loadTodos = async() => {
    this.setState({
      loading: true,
      hasLoadingError: false,
    });

    try {
      const todos = await getTodos()
      this.setState({
        todos: todos,
      });
    } catch (error) {
      this.setState({
        hasLoadingError: true,
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, todos } = this.state;
    if (prevState.query !== query) {
      const filteredTodos = todos
        .filter(todo => {
          if (todo.title === null) {
            return false;
          } else {
          return todo.title.includes(query);
          }
        });

        this.setState({
        filteredTodos,
      })
    }
  }

  filterHandler = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  deleteUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, filteredTodos, loading, hasLoadingError } = this.state;
    return (
      <>
        <div className="App">
          <div className="App__sidebar">

            {todos.length === 0 ? (
              <button
                className={classnames('button', 'is-link', { 'is-loading': loading })}
                onClick={this.loadTodos}
                type="button"
              >
                load todos
              </button>
            ) : (
              <>
                <div>
                  <input
                    value={this.state.query}
                    onChange={this.filterHandler}
                    className="input is-rounded"
                    type="text"
                    placeholder="Primary input"
                  />
                </div>

                <TodoList
                  todos={filteredTodos.length > 0
                    ? filteredTodos
                    : todos}
                  selectedUserId={selectedUserId}
                  selectUser={(selectedUserId) => {
                    this.setState({ selectedUserId });
                  }}/>
              </>
            )}

          </div>
          <div className="App__content">
            <div className="App__content-container">

              {selectedUserId
                ? ( <CurrentUser
                      deleteUser={this.deleteUser}
                      userId={selectedUserId}
                    />)
                : 'No user selected'}
            </div>
          </div>

        </div>
        {hasLoadingError && <LoadingError />}
      </>
    );
  }
}

export default App;
