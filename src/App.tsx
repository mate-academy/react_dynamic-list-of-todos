import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number | null;
  todosFromServer: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todosFromServer: [],
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todosFromServer: todos });
      });
  }

  selectUser = (id:number | null) => {
    this.setState({ selectedUserId: id });
  };

  resetUserId = () => {
    this.setState({ selectedUserId: 0 });
  };

  completeChanger = (todoId: number) => {
    this.setState(state => ({
      todosFromServer: [
        ...state.todosFromServer.map((todo) => {
          if (todo.id === todoId) {
            const todoWithChangedCompleted = {
              ...todo,
              completed: !todo.completed,
            };

            return todoWithChangedCompleted;
          }

          return todo;
        }),
      ],
    }));
  };

  render() {
    const { selectedUserId, todosFromServer } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            preparedTodos={todosFromServer}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            completeToggle={this.completeChanger}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clear={this.resetUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
