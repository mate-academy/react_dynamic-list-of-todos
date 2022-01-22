import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getToods } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  checkedTodo: number,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    checkedTodo: 0,
  };

  componentDidMount() {
    this.loader();
  }

  loader = async () => {
    await getToods
      .then(todos => this.setState({ todos }));
  };

  onSelectedUserId = (selectedUserId: number, checkedTodo: number) => {
    this.setState({
      selectedUserId,
      checkedTodo,
    });
  };

  sortByTitle = async (title: string) => {
    await this.loader();

    this.setState(state => (
      { todos: state.todos.filter((todo: Todo) => todo.title.includes(title)) }
    ));
  };

  sortByCompleted = async (by: string) => {
    await this.loader();

    switch (by) {
      case 'all':
        this.setState(state => ({ todos: state.todos }));
        break;
      case 'active':
        this.setState(state => (
          { todos: state.todos.filter((todo: Todo) => todo.completed === false) }
        ));
        break;

      default:
        this.setState(state => (
          { todos: state.todos.filter((todo: Todo) => todo.completed === true) }
        ));
    }
  };

  randomize = () => {
    this.loader();
    this.setState(state => ({ todos: state.todos.sort(() => 0.5 - Math.random()) }));
  };

  render() {
    const { selectedUserId, todos, checkedTodo } = this.state;
    const {
      onSelectedUserId,
      sortByTitle,
      sortByCompleted,
      randomize,
    } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelectedUserId={onSelectedUserId}
            checkedTodo={checkedTodo}
            sortByTitle={sortByTitle}
            sortByCompleted={sortByCompleted}
            randomize={randomize}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId > 0 ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                onSelectedUserId={onSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
