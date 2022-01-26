import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import CurrentUser from './components/CurrentUser';
import { getTodos } from './Api/Api';

enum FilterParameters {
  All,
  Active,
  Completed,
}

interface State {
  selectedUserId: number;
  todos: Todo[];
  filterParameter: FilterParameters;
  searchTitle: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filterParameter: FilterParameters.All,
    searchTitle: '',
  };

  componentDidMount() {
    this.getTodosFromServer();
  }

  handleSearch = (searchTitle: string) => {
    this.setState({
      searchTitle,
    });
  };

  handleFilter = (filterParameter: FilterParameters) => {
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
      case FilterParameters.Active:
        filtered = todosCopy.filter(todo => todo.completed !== true);
        break;

      case FilterParameters.Completed:
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
          />
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
