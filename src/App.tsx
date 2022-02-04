import React from 'react';
import './App.scss';
import './styles/general.scss';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  title: string;
  todosToShow: string;
  loading: boolean;
  titleToSearch: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    title: '',
    titleToSearch: '',
    todosToShow: 'all',
    loading: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos: [...todos] });
  }

  selectUser = (selectedUserId: number) => {
    this.setState({ selectedUserId });
    if (selectedUserId !== this.state.selectedUserId && selectedUserId !== 0) {
      this.changeLoadingStatus();
    }
  };

  prepareTodos = () => {
    const {
      todos,
      titleToSearch,
      todosToShow,
    } = this.state;

    let copiedTodos = [...todos];

    if (titleToSearch) {
      copiedTodos = copiedTodos.filter(
        todo => todo.title.toLowerCase().includes(titleToSearch),
      );
    }

    switch (todosToShow) {
      case 'active':
        return copiedTodos.filter(todo => !todo.completed);

      case 'completed':
        return copiedTodos.filter(todo => todo.completed);

      default:
        return copiedTodos;
    }
  };

  handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      todosToShow: value,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      titleToSearch: value.toLowerCase(),
    });
  };

  changeTodoStatus = (todoId: number) => {
    const { todos } = this.state;

    const changedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    this.setState({
      todos: changedTodos,
    });
  };

  randomizeOrder = () => {
    const { todos } = this.state;
    const copiedTodos = [...todos];

    copiedTodos.sort(() => Math.random() - 0.5);

    this.setState({
      todos: copiedTodos,
    });
  };

  changeLoadingStatus = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  };

  render() {
    const {
      selectedUserId,
      title,
      todosToShow,
      loading,
    } = this.state;
    const preparedTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            handleChangeStatus={this.handleChangeStatus}
            handleChangeTitle={this.handleChangeTitle}
            titleToSearch={title}
            todosToShow={todosToShow}
            randomize={this.randomizeOrder}
            changeTodoStatus={this.changeTodoStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            <progress
              className={classNames(
                'progress',
                'is-small',
                'is-link',
                { 'App__content--hidden': !loading },
              )}
              max="100"
            >
              10%
            </progress>
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                selectUser={this.selectUser}
                changeLoadingStatus={this.changeLoadingStatus}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
