import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getTodoByComlete } from './api';

interface State {
  todos: Todo[],
  selectedUserId: number,
  inputValue: string,
  selectValue: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    inputValue: '',
    selectValue: 'all',
  };

  componentDidMount() {
    this.getTodosFromServer();
  }

  getTodosFromServer = () => {
    getAllTodos()
      .then(todosFromServer => {
        this.setState({
          todos: [...todosFromServer],
        });
      });
  };

  selectUserHandler = (userId: string) => {
    const userNewId = +userId;

    if (this.state.selectedUserId !== userNewId) {
      this.setState({ selectedUserId: userNewId });
    }
  };

  changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  };

  changeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.filterBySelect(value);

    this.setState({
      selectValue: value,
    });
  };

  filterBySelect = (selectValue: string) => {
    switch (selectValue) {
      case 'completed':
        getTodoByComlete(true)
          .then(todosFromServer => {
            this.setState({ todos: [...todosFromServer] });
          });
        break;

      case 'not completed':
        getTodoByComlete(false)
          .then(todosFromServer => {
            this.setState({ todos: [...todosFromServer] });
          });
        break;

      default:
        getAllTodos()
          .then(todosFromServer => {
            this.setState({
              todos: [...todosFromServer],
            });
          });
        break;
    }
  };

  getTodosFilteredByInput = (todos: Todo[], inputValue: string) => {
    if (inputValue.length) {
      return todos
        .filter(todo => todo.title.toLowerCase().includes(inputValue.toLowerCase()));
    }

    return todos;
  };

  shuffle = (todos: Todo[]) => {
    const randomizedTodos = todos;

    for (let i = randomizedTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [randomizedTodos[i], randomizedTodos[j]] = [randomizedTodos[j], randomizedTodos[i]];
    }

    return randomizedTodos;
  };

  randomize = () => {
    this.setState(prevState => ({
      todos: this.shuffle(prevState.todos),
    }));
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      selectedUserId,
      selectValue,
      inputValue,
      todos,
    } = this.state;

    return (
      <>
        <div className="App">
          <div className="App__sidebar">
            <TodoList
              todos={this.getTodosFilteredByInput(todos, inputValue)}
              selectedUserId={selectedUserId}
              inputValue={this.state.inputValue}
              selectValue={selectValue}
              selectUserHandler={this.selectUserHandler}
              changeInputValue={this.changeInputValue}
              changeSelectValue={this.changeSelectValue}
              randomize={this.randomize}
            />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={this.clearUser}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
