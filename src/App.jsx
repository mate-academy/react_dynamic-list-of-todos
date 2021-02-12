/* eslint-disable */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma/css/bulma.css';
import classnames from 'classnames';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { LoadingError } from './components/LoadingError/LoadingError';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedStatus: '',
  };


  async componentDidMount() {
      try {
        const todos = await getTodos();

        this.setState({
          todos: todos.filter(todo => todo.userId !== null && todo.title !== ''),
        });
      } catch (error) {
        this.setState({
          hasLoadingError: true,
        });
      }
  }

  deleteUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {

    console.log(this.state.todos);
    const { todos, selectedUserId, hasLoadingError } = this.state;
    return (
      <>
        <div className="App">
          <div className="App__sidebar">

            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              selectUser={(selectedUserId) => {
                this.setState({ selectedUserId });
              }}
            />

          </div>
          <div className="App__content">
            <div className="App__content-container">

              {selectedUserId
                ? ( <CurrentUser
                  deleteUser={this.deleteUser}
                  userId={selectedUserId}
                />)
                : 'No user selected'}
            </div>
          </div>

        </div>
        {hasLoadingError && <LoadingError />}
      </>
    );
  }
}

export default App;
