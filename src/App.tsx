import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  searchQuery: string,
  todoStatus: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    searchQuery: '',
    todoStatus: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  filterTodos = () => {
    const { todos, searchQuery, todoStatus } = this.state;

    let filtredTodos = todos;

    if (searchQuery) {
      filtredTodos = filtredTodos.filter(({ title }) => title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()));
    }

    if (todoStatus) {
      filtredTodos = filtredTodos.filter(({ completed }) => {
        if (todoStatus === 'completed') {
          return completed;
        }

        if (todoStatus === 'not completed') {
          return !completed;
        }

        return true;
      });
    }

    return filtredTodos;
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  randomizeTodosOrder = () => {
    const { todos } = this.state;

    const suffeledTodos = [...todos];

    for (let i = suffeledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [suffeledTodos[i], suffeledTodos[j]] = [suffeledTodos[j], suffeledTodos[i]];
    }

    this.setState({ todos: suffeledTodos });
  };

  render() {
    const {
      selectedUserId,
      todos,
      searchQuery,
      todoStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!!todos.length && (
            <TodoList
              todos={this.filterTodos()}
              searchQuery={searchQuery}
              todoStatus={todoStatus}
              onSearchChange={this.handleChange}
              onSelectUser={this.selectUser}
              onRandomize={this.randomizeTodosOrder}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUserInfo={this.clearSelectedUser}
              />
            ) : (
              <div className="alert alert-primary" role="alert">
                No user selected
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
