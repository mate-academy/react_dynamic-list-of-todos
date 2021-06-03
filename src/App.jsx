import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    search: '',
    selectFilter: 'All',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleUserId = (userId) => {
    if (this.selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  };

  searchHandler = ({ value }) => {
    this.setState({
      search: value,
    });
  };

  todosSelectFilter = (value) => {
    this.setState({ selectFilter: value });
  };

  render() {
    const {
      todos,
      selectedUserId,
      search,
      selectFilter,
    } = this.state;

    let visibleTodos = todos
      .filter(todo => !!todo.title)
      .filter(
        (todo) => {
          const { title } = todo;

          return (
            title.trim().toLocaleLowerCase()
              .includes(search.trim().toLocaleLowerCase())
          );
        },
      );

    if (selectFilter === 'Completed') {
      visibleTodos = visibleTodos.filter(({ completed }) => completed);
    }

    if (selectFilter === 'Active') {
      visibleTodos = visibleTodos.filter(({ completed }) => !completed);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            onUserId={this.handleUserId}
            selectedUserId={selectedUserId}
            search={search}
            onSearch={this.searchHandler}
            onSelect={this.todosSelectFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
