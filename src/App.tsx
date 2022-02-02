import React from 'react';
import './App.scss';
import './styles/general.scss';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

interface State {
  selectedUserId: number,
  todos: Todo[],
  searchRequest: string,
  status: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    searchRequest: '',
    status: 'all',
  };

  componentDidMount() {
    const todoEndpoint = '/todos';

    getData<Todo[]>(todoEndpoint)
      .then(todosFromServer => {
        this.setState({
          todos: todosFromServer,
        });
      });
  }

  handleSelectedUser = (userId: number) => {
    const { selectedUserId } = this.state;

    if (userId === selectedUserId) {
      return;
    }

    this.setState({ selectedUserId: userId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  handleSearchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      searchRequest: value,
    });
  };

  handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      status: value,
    });
  };

  render() {
    const {
      todos,
      selectedUserId,
      searchRequest,
      status,
    } = this.state;
    const {
      handleSelectedUser,
      clearSelectedUser,
      handleSearchByTitle,
      handleStatus,
    } = this;
    let filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(searchRequest.toLowerCase())
    ));

    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        case 'all':
        default:
          return todo;
      }
    });

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            selectUser={handleSelectedUser}
            searchRequest={searchRequest}
            searchByTitle={handleSearchByTitle}
            status={status}
            handleStatus={handleStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
