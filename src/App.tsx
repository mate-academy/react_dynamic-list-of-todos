import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './types/types';

interface State {
  todos: Todo[];
  selectedUserId: number;
  search: string,
  status: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    search: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const {
      todos,
      selectedUserId,
      search,
      status,
    } = this.state;
    let filteredTodos = todos.filter(todo => todo.title.includes(search));

    if (status === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            name="search"
            value={search}
            onChange={this.handleChange}
          />

          <select
            name="status"
            onChange={this.handleChange}
          >
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <TodoList
            todos={filteredTodos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
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
