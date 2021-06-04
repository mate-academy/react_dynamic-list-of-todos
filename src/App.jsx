import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { allTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    filterTitle: '',
    filterStatus: 'all',
  };

  componentDidMount() {
    allTodos('/todos')
      .then(({ data }) => this.setState({ todos: [...data] }));
  }

  filterTodos = (event) => {
    this.setState({ filterTitle: event.target.value });
  }

  onChangeFilterStatus = (event) => {
    this.setState({ filterStatus: event.target.value });
  }

  selectUser = (userId) => {
    this.setState((state) => {
      if (state.selectedUserId === userId) {
        return state;
      }

      return {
        ...state,
        selectedUserId: userId,
      };
    });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  todosFiltred = () => {
    const { todos, filterTitle, filterStatus } = this.state;

    let renderTodos = [...todos];

    if (filterTitle) {
      renderTodos = [...renderTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(filterTitle.toLowerCase())
      ));
    }

    if (filterStatus === 'active') {
      renderTodos = [...renderTodos].filter(todo => todo.completed);
    }

    if (filterStatus === 'completed') {
      renderTodos = [...renderTodos].filter(todo => !todo.completed);
    }

    return renderTodos;
  }

  render() {
    const { selectedUserId, filterTitle } = this.state;

    const renderTodos = this.todosFiltred();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={renderTodos}
            filterTodos={this.filterTodos}
            filterTitle={filterTitle}
            onChangeFilterStatus={this.onChangeFilterStatus}
            selectUser={this.selectUser}
            selectedUser={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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
