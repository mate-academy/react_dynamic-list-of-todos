import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './types';

interface State {
  selectedUserId: number;
  todos: Todo[];
  query: string;
  searchedChars: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    query: '',
    searchedChars: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  setQuery = (query: string) => {
    this.setState({ query });
  };

  setChars = (str: string) => {
    this.setState({ searchedChars: str });
  };

  selectUserId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const { selectedUserId, query, searchedChars } = this.state;

    let currentTodos = this.state.todos;

    switch (this.state.query) {
      case 'all':
        currentTodos = this.state.todos;
        break;
      case 'active':
        currentTodos = this.state.todos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        currentTodos = this.state.todos.filter(todo => todo.completed === true);
        break;
      default:
        currentTodos = this.state.todos;
    }

    const todosByChars = currentTodos.filter(({ title }) => {
      return title.toLowerCase().includes(searchedChars.toLowerCase());
    });

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            setChars={this.setChars}
            searchedChars={searchedChars}
            todos={todosByChars}
            selectUserId={this.selectUserId}
            query={query}
            setQuery={this.setQuery}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                callback={this.selectUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
