/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosByStatus } from './api/api';

interface State {
  selectedUserId: number,
  status: string,
  todos: Todo[],
  query: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    status: 'all',
    todos: [],
    query: '',
  };

  componentDidMount() {
    this.loadTodosByStatus();
  }

  componentDidUpdate(prevState: State) {
    if (this.state.status !== prevState.status) {
      this.loadTodosByStatus();
    }
  }

  setSelectedUserId = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  setStatus = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'query' | 'status'>);
  };

  getTodosByQuery = () => {
    const { todos, query } = this.state;
    const queryLoverCase = query.toLowerCase();

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(queryLoverCase)));
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  async loadTodosByStatus() {
    const { status } = this.state;
    const todos = await getTodosByStatus(status);

    this.setState({ todos });
  }

  render() {
    const {
      selectedUserId,
      status,
      query,
    } = this.state;

    const visibleTodos = this.getTodosByQuery();

    return (
      <div className="App">
        <div className="App__sidebar">
          <form className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Type search word</label>
                <input
                  type="text"
                  id="search-query"
                  placeholder="Type search word"
                  value={query}
                  onChange={this.setStatus}
                />
              </div>
              <div className="field">
                <label>Choose status</label>
                <select
                  className="ui fluid dropdown"
                  value={status}
                  onChange={this.setStatus}
                >
                  <option value="all">All</option>
                  <option value="false">Active</option>
                  <option value="true">Completed</option>
                </select>
              </div>
            </div>
          </form>
          <TodoList
            setSelectedUserId={this.setSelectedUserId}
            todos={visibleTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
