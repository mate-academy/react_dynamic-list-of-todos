import React from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getResponse } from './api';

interface State {
  todos: Todo[] | [],
  selectedUserId: number,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount = async () => {
    this.setState({ todos: await getResponse('todos') });
  };

  setSelectedUserId = (id: number) => {
    if (this.state.selectedUserId !== id) {
      this.setState({ selectedUserId: id });
    }
  };

  setTodosByChecked = (id: number) => {
    this.setState(state => {
      const newTodos = state.todos.map(todo => {
        return todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

      return { todos: newTodos };
    });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { selectedUserId, todos } = this.state;
    const {
      setTodosByChecked,
      setSelectedUserId,
      clearUser,
    } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            setTodosByChecked={setTodosByChecked}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
