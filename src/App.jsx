import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    titleSearch: '',
    selectStatus: 'All',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos: todos.data });
  }

  setCurrentUser = (userId) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  }

  handleChangeTitle = ({ value }) => {
    this.setState({ titleSearch: value });
  }

  setTodosStatus = (status) => {
    this.setState({ selectStatus: status });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  prepareTodos = () => {
    const { todos, titleSearch, selectStatus } = this.state;

    let visiableTodos = [...todos];

    if (selectStatus === 'Active') {
      visiableTodos = [...todos].filter(({ completed }) => !completed);
    }

    if (selectStatus === 'Completed') {
      visiableTodos = [...todos].filter(({ completed }) => completed);
    }

    if (titleSearch) {
      visiableTodos = todos.filter(
        todo => `${todo.title}`.toLowerCase().includes(
          this.state.titleSearch.toLowerCase(),
        ),
      );
    }

    return visiableTodos;
  }

  render() {
    const { todos, selectedUserId, titleSearch } = this.state;

    const visiableTodos = this.prepareTodos();

    return (
      <div className="App">
        {todos.length > 0
          && (
          <>
            <div className="App__sidebar">
              <TodoList
                todos={visiableTodos}
                onUserSelect={this.setCurrentUser}
                selectedUser={selectedUserId}
                titleSearch={titleSearch}
                handleChangeTitle={this.handleChangeTitle}
                setStatus={this.setTodosStatus}
              />
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser
                    userId={selectedUserId}
                    onClearUser={this.clearUser}
                  />
                ) : 'No user selected'}
              </div>
            </div>
          </>
          )
        }
      </div>
    );
  }
}

export default App;
