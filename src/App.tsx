import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  visibleTodos: Todo[];
  query: string;
  sortBy: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    visibleTodos: [],
    query: '',
    sortBy: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ visibleTodos: todos });
  }

  handleChangeUserId = (id: number) => {
    this.setState({
      selectedUserId: id,
    });
  };

  handlerClear = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  getVisibleTodos = () => {
    const { query, visibleTodos, sortBy } = this.state;

    let todos;

    switch (sortBy) {
      case 'active':
        todos = visibleTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        todos = visibleTodos.filter(todo => todo.completed);
        break;
      default:
        todos = visibleTodos;
    }

    return todos.filter(todo => {
      const { title } = todo;
      const lowerQuery = query.toLocaleLowerCase();

      return title.toLowerCase().includes(lowerQuery);
    });
  };

  handleSelectTodos = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortBy: event.target.value });
  };

  handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  render() {
    const { selectedUserId, query, sortBy } = this.state;
    const filteredTodos = this.getVisibleTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            onClick={this.handleChangeUserId}
            onChangeQuery={this.handleChangeQuery}
            query={query}
            sortBy={sortBy}
            select={this.handleSelectTodos}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clear={this.handlerClear} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
