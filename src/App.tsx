import React from 'react';

import './styles/general.scss';
import './App.scss';
import * as API from './api';
import { TodoList, SortBy } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  user: User | null;
  searchQuery: string;
  todos: Todo[];
  filterCompleted: SortBy;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    user: null,
    searchQuery: '',
    todos: [],
    filterCompleted: SortBy.default,
  };

  async componentDidMount() {
    this.loadTodos();
  }

  loadUser = async (userId: number) => {
    const user = await API.getUser(userId);

    this.setState({
      user,
    });
  };

  loadTodos = async (filter = '') => {
    const todos = await API.getTodos(filter);

    this.setState({
      todos,
    });
  };

  handleSelectUser = (userId: number) => {
    this.setState(() => ({
      selectedUserId: userId,
    }), () => this.loadUser(this.state.selectedUserId));
  };

  handleClearUser = () => {
    this.setState(() => ({
      user: null,
      selectedUserId: 0,
    }));
  };

  handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleSelectCompletionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(() => ({
      filterCompleted: event.target.value as SortBy,
    }), () => this.loadTodos(this.state.filterCompleted));
  };

  getVisibleTodos = (todos: Todo[], str: string): Todo[] => {
    const query = str.toLowerCase();

    return todos.filter(todo => todo.title.toLowerCase().includes(query));
  };

  shuffle = (array: Todo[]): Todo[] => {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  };

  handleRandomize = () => {
    this.setState(prevState => ({
      todos: this.shuffle(prevState.todos),
    }));
  };

  render() {
    const {
      selectedUserId,
      todos,
      user,
      searchQuery,
      filterCompleted,
    } = this.state;

    const visibleTodos = this.getVisibleTodos(todos, searchQuery);

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            onRandomize={this.handleRandomize}
            onSelectCompletionChange={this.handleSelectCompletionChange}
            filterCompleted={filterCompleted}
            todos={visibleTodos}
            onSelectUser={this.handleSelectUser}
            selectedUserId={selectedUserId}
            query={searchQuery}
            onChangeSearchInput={this.handleChangeSearchInput}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {user ? (
              <CurrentUser
                user={user}
                onClearUser={this.handleClearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
