/* eslint-disable no-case-declarations */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  filtredTodos: Todo[];
  filterInputValue: string;
  filterBy: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filtredTodos: [],
    filterInputValue: '',
    filterBy: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      filtredTodos: todos,
    });
  }

  componentDidUpdate(_: unknown, prevState: State) {
    const { filterInputValue, todos } = this.state;

    if (prevState.filterInputValue !== filterInputValue) {
      const filtredTodos = todos.filter(todo => todo.title.includes(filterInputValue));

      this.setState({ filtredTodos });
    }
  }

  handleSelectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  handleTodoFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterInputValue: event.target.value });
  };

  handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { filterBy, todos } = this.state;
    const { value } = event.target;

    this.setState({ filterBy: value });

    if (filterBy !== value) {
      switch (value) {
        case 'all':
          this.setState({ filtredTodos: todos });
          break;

        case 'not completed':
          const filtredByNotCompleted = todos.filter(todo => !todo.completed);

          this.setState({ filtredTodos: filtredByNotCompleted });
          break;

        case 'completed':
          const filtredByCompleted = todos.filter(todo => todo.completed);

          this.setState({ filtredTodos: filtredByCompleted });
          break;

        default:
          return null;
      }
    }

    return null;
  };

  render() {
    const {
      selectedUserId,
      filtredTodos,
      filterInputValue,
      filterBy,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filtredTodos}
            selectedUserId={selectedUserId}
            selectUser={this.handleSelectUser}
            handleTodoFilter={this.handleTodoFilter}
            filterInputValue={filterInputValue}
            filterBy={filterBy}
            handleSelectFilter={this.handleSelectFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={this.handleSelectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
