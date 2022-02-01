import React from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/Todo';

import './App.scss';
import './styles/general.scss';

type Props = {};

type State = {
  selectedUserId: number,
  todos: Todo[],
};

export class App extends React.PureComponent<Props, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    getTodos(this.state.selectedUserId)
      .then(todosFromServer => {
        this.setState({
          todos: todosFromServer,
        });
      });
  }

  componentDidUpdate(_: Props, prevState: State) {
    const { selectedUserId } = this.state;

    if (selectedUserId !== prevState.selectedUserId) {
      getTodos(selectedUserId)
        .then(todosFromServer => {
          this.setState({
            todos: todosFromServer,
          });
        });
    }
  }

  selectUser = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <header className="App__header">
          <label htmlFor="users-selector">
            Select a user: &nbsp;

            <select
              value={selectedUserId}
              onChange={(event) => (
                this.selectUser(+event.target.value)
              )}
            >
              <option value="0">All users</option>
              <option value="7">Leanne Graham</option>
              <option value="8">Ervin Howell</option>
              <option value="9">Clementine Bauch</option>
              <option value="7777">Patricia Lebsack</option>
            </select>
          </label>
        </header>

        <main className="App__main">
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={this.selectUser}
              selectedUserId={this.state.selectedUserId}
            />
          </div>

          <div className="App__content">
            <CurrentUser userId={this.state.selectedUserId} clearUser={this.clearUser} />
          </div>
        </main>
      </div>
    );
  }
}
