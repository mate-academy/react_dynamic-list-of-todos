import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './react-app-env';

interface State {
  selectedUserId: number,
  todos: Todo[],
  input: string,
  todoStatus:string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    input: '',
    todoStatus: 'All',
  };

  componentDidMount() {
    getTodos().then(todos => this.setState({ todos }));
  }

  todoFilter = () => {
    getTodos()
      .then(todos => this.setState((prevState) => ({
        todos: todos.filter((todo:Todo) => todo.title.includes(prevState.input)
          && this.todoStatus(todo.completed)),
      })));
  };

  universalHandler = (event:React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const newInput = event.currentTarget.value;

    this.setState({
        [fieldName]: newInput,
      } as unknown as Pick<State, keyof State>);
    this.todoFilter();
  }

  selectUser = (event:React.MouseEvent<HTMLButtonElement>) => {
    const newId = +event.currentTarget.name;

    this.setState({ selectedUserId: newId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  todoStatus(status:boolean) {
    switch (this.state.todoStatus) {
      case 'completed':
        return status;
      case 'uncompleted':
        return !status;
      default:
        return true;
    }
  }

  render() {
    const { selectedUserId, todos, todoStatus, input } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">

          {todos
            && (
              <TodoList
                todos={todos}
                callb={this.selectUser}
                handler={this.universalHandler}
                input={input}
                todoStatus={todoStatus}
              />
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
