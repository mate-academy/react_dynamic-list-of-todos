import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  filterByTitle: string;
  selectedStatus: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filterByTitle: '',
    selectedStatus: 'all',
  };

  componentDidMount() {
    getTodos().then((todos) => {
      this.setState({ todos });
    });
  }

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  getFilteredTodos() {
    const { todos, filterByTitle, selectedStatus } = this.state;

    let filteredTodos = todos.filter((todo) => todo.title.includes(filterByTitle));

    if (selectedStatus === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    }

    if (selectedStatus === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    }

    return filteredTodos;
  }

  selectUser = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, selectedStatus } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            value={this.state.filterByTitle}
            name="filterByTitle"
            onChange={this.handleChange}
          />
          <select
            name="selectedStatus"
            value={selectedStatus}
            onChange={this.handleChange}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
          <TodoList
            todos={this.getFilteredTodos()}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
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
