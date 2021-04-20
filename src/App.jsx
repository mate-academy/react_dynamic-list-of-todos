import React from 'react';
import './App.scss';
import './styles/general.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    this.getData();
  }

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  getData = async() => {
    const todosFromApi = await getTodos();

    this.setState({ todos: todosFromApi });
  }

  removeUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {
            todos.length === 0
              ? <CircularProgress />
              : (
                <TodoList
                  todos={todos}
                  selectUser={this.selectUser}
                  selectedUserId={selectedUserId}
                />
              )
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                removeUser={this.removeUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
