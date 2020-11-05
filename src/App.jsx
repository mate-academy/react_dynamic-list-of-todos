import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getToDos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTask: '',
    query: '',
    isTaskDone: '',
  };

  async componentDidMount() {
    const todos = await getToDos();

    this.setState({ todos });
  }

  handleUser = (selectedUserId, selectedTask = '') => {
    this.setState({
      selectedUserId, selectedTask,
    });
  }

  handleStatus = (event) => {
    this.setState({
      isTaskDone: event.target.value,
    });
  }

  checkQuery = (event) => {
    this.setState({
      query: event.target.value.toLowerCase(),
    });
  }

  render() {
    const { handleUser, checkQuery, handleStatus, state } = this;
    const { selectedUserId } = state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            handleUser={handleUser}
            handleStatus={handleStatus}
            checkQuery={checkQuery}
            {...state}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {!selectedUserId
            ? 'No user selected'
            : <CurrentUser
                userId={selectedUserId}
                handleUser={handleUser}
              />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
