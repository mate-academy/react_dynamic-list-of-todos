import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

interface State {
  todos: Todo[],
  selectedUserId: number,
  errorMessage: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 1,
    errorMessage: '',
  };

  // async componentDidMount() {
  //   const todos = await getData('/todos');

  //   this.setState({ todos });
  // }

  componentDidMount() {
    getData('/todos')
      .then(todos => {
        this.setState({ todos });
      });
    // .catch(() => {
    //   this.setState({ errorMessage: 'Can\'t load data' });
    // });
    // не получается обработать ошибку
  }

  selectUser = (userId: number) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({ selectedUserId: userId });
    }
  };

  render() {
    const { selectedUserId, todos, errorMessage } = this.state;

    return (
      <div className="App">
        {todos ? (
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
            />
          </div>
        ) : (
          { errorMessage }
        )}

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={this.state.selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
