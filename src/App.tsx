import React, { ChangeEventHandler } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './types/Todo';

interface State {
  todos: Todo[];
  selectedUserId: number;
  selectedTodoId: number;
  todosSearch: string;
  todosStatus: string;
}

class App extends React.Component {
  state: State = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
    todosSearch: '',
    todosStatus: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos,
      }));
  }

  setFilteredTodos = (todos: Todo[]) => {
    this.setState({ todos });
  };

  setSelectedId = (key: string, id: number) => {
    this.setState({
      [key]: id,
    });
  };

  changeHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      todos,
      selectedUserId,
      selectedTodoId,
      todosSearch,
      todosStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedTodoId={selectedTodoId}
            setSelectedId={this.setSelectedId}
            todosSearch={todosSearch}
            todosStatus={todosStatus}
            onChange={this.changeHandler}
            setTodos={this.setFilteredTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                setSelectedId={this.setSelectedId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
