import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api';

interface State {
  todos: Todo[],
  selectedUserId: number,
  inputValue: string,
  selectValue: string,
  loading: boolean,
  errorMessage: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    inputValue: '',
    selectValue: 'all',
    loading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async (completed?: boolean) => {
    this.setState({
      loading: true,
    });

    try {
      const todosFromServer = await getTodosFromServer(completed);

      this.setState({
        todos: [...todosFromServer],
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Oops... Server is not responding',
      });
    } finally {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 500);
    }
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

  filterBySelect = async (selectValue: string) => {
    this.setState({
      loading: true,
    });

    switch (selectValue) {
      case 'completed':
        this.getTodos(true);
        break;

      case 'not completed':
        this.getTodos(false);
        break;

      default:
        this.getTodos();
        break;
    }
  };

  getTodosFilteredByInput = (todos: Todo[]) => {
    const { inputValue } = this.state;

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
      todos,
      loading,
      errorMessage,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getTodosFilteredByInput(todos)}
            selectedUserId={selectedUserId}
            inputValue={this.state.inputValue}
            selectValue={selectValue}
            loading={loading}
            errorMessage={errorMessage}
            selectUserHandler={this.selectUserHandler}
            changeInputValue={this.changeInputValue}
            changeSelectValue={this.changeSelectValue}
            randomize={this.randomize}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId
              ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={this.clearUser}
                />
              )
              : (
                'No user selected'
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
