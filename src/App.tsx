import React from 'react';
import { getTodos, filterTodos } from './api';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

type State = {
  selectedUserId: number;
  todosFromServer: Todo[];
  searchValue: string;
  filterBy: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todosFromServer: [],
    searchValue: '',
    filterBy: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todosFromServer: [...todos] });
  }

  async componentDidUpdate(_: {}, prevState: State) {
    if (prevState.filterBy !== this.state.filterBy) {
      switch (this.state.filterBy) {
        case 'active':
          filterTodos(false)
            .then(todos => {
              this.setState({ todosFromServer: [...todos] });
            });
          break;

        case 'completed':
          filterTodos(true)
            .then(todos => {
              this.setState({ todosFromServer: [...todos] });
            });
          break;

        default:
          getTodos()
            .then(todos => {
              this.setState({ todosFromServer: [...todos] });
            });
      }
    }
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  searchTodo = (query: string) => {
    this.setState({ searchValue: query });
  };

  filterTodo = (filterValue: string) => {
    this.setState({ filterBy: filterValue });
  };

  showTodos = () => {
    const { todosFromServer, searchValue } = this.state;

    return todosFromServer.filter(todo => todo.title.includes(searchValue));
  };

  render() {
    const {
      selectedUserId,
      searchValue,
      filterBy,
    } = this.state;

    const visibleTodos = this.showTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            visibleTodos={visibleTodos}
            onSelectUser={this.selectUser}
            onSearchTodo={this.searchTodo}
            searchValue={searchValue}
            onFilterTodo={this.filterTodo}
            filterBy={filterBy}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  onClearUser={this.clearUser}
                />
              )
              : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
