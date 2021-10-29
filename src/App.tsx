import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './ api';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    getTodos()
      .then(todosFromServer => {
        this.setState({ todos: todosFromServer });
      });
  }

  setUserId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  clear = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            selectUserId={this.setUserId}
            todos={todos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId > 0 ? (
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
