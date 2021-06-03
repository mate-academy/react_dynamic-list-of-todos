import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    completedStatus: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: todos.data,
    });
  }

  queryUpdate = (value) => {
    this.setState({ query: value });
  };

  setCompletedStatus = (status) => {
    this.setState({ completedStatus: status });
  }

  render() {
    const { todos, selectedUserId, query, completedStatus } = this.state;
    const normalizeQuery = query.toLowerCase().trim();

    let visibleTodos = todos.filter(
      todo => ((todo.title != null)
        ? todo.title.toLowerCase().includes(normalizeQuery) : todo.title),
    );

    switch (completedStatus) {
      case 'Active':
        visibleTodos = [...todos].filter(({ completed }) => !completed);
        break;
      case 'Completed':
        visibleTodos = [...todos].filter(({ completed }) => completed);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            queryUpdate={this.queryUpdate}
            setCompletedStatus={this.setCompletedStatus}
            selectUser={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                selectUser={(userId) => {
                  this.setState({ selectedUserId: userId });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
