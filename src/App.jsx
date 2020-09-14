import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: '',
    query: '',
    status: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.userId !== null),
      }));
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clear = () => {
    this.setState({ selectedUserId: '' });
  }

  queryChange = (event) => {
    this.setState({ query: event.target.value.trimLeft() });
  }

  statusChange = (event) => {
    this.setState({ status: event.target.value });
  }

  render() {
    const { todos, selectedUserId, query, status } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            query={query}
            status={status}
            statusChange={this.statusChange}
            queryChange={this.queryChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
