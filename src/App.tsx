import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import CurrentUser from './components/CurrentUser';
import { getTodos } from './Api/Api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  filterParameter: string;
  searchTitle: string;
  userError: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filterParameter: 'All',
    searchTitle: '',
    userError: '',
  };

  componentDidMount() {
    this.getTodosFromServer();
  }

  handleUserError = (error: string) => {
    this.setState({
      userError: error,
    });
  };

  handleSearch = (searchTitle: string) => {
    this.setState({
      searchTitle,
    });
  };

  handleFilter = (filterParameter: string) => {
    this.setState({
      filterParameter,
    });
  };

  handleUserSelect = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  getFilteredTodos = () => {
    const { filterParameter, searchTitle } = this.state;
    const todosCopy = [...this.state.todos];
    let filtered: Todo[];

    switch (filterParameter) {
      case 'Active':
        filtered = todosCopy.filter(todo => todo.completed !== true);
        break;

      case 'Completed':
        filtered = todosCopy.filter(todo => todo.completed === true);
        break;

      default:
        filtered = todosCopy;
        break;
    }

    filtered = filtered.filter(todo => todo.title.includes(searchTitle));

    return filtered;
  };

  changeTodoStatus = (todoTitle: string) => {
    const todoCopy = [...this.state.todos];
    const changedTodoIndex = todoCopy.findIndex(todo => todo.title === todoTitle);

    todoCopy[changedTodoIndex].completed = !todoCopy[changedTodoIndex].completed;

    this.setState(prevState => ({
      ...prevState,
      todos: todoCopy,
    }));
  };

  getUserMessage = () => {
    if (this.state.userError !== '') {
      return (
        <div className="App__content-container">
          {this.state.userError}
        </div>
      );
    }

    return (
      <div className="App__content-container">
        {this.state.selectedUserId ? (
          <CurrentUser
            selectedUserId={this.state.selectedUserId}
            clearUser={this.clearUser}
            handleUserError={this.handleUserError}
          />
        ) : 'No user selected'}
      </div>
    );
  };

  getTodosFromServer = async () => {
    const todos = await getTodos();

    this.setState({ todos });
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getFilteredTodos()}
            selectedUserId={selectedUserId}
            handleUserSelect={this.handleUserSelect}
            changeTodoStatus={this.changeTodoStatus}
            handleSearch={this.handleSearch}
            handleFilter={this.handleFilter}
            handleUserError={this.handleUserError}
          />
        </div>

        <div className="App__content">
          {this.getUserMessage()}
        </div>
      </div>
    );
  }
}

export default App;
