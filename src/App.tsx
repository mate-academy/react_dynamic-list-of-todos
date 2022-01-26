import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getToods } from './api/api';

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
    this.loader();
  }

  loader = async () => {
    const todos = await getToods;

    this.setState({ todos });
  };

  onSelectedUserId = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  sortByTitle = (title: string) => {
    this.setState(state => (
      { todos: state.todos.filter((todo: Todo) => todo.title.includes(title)) }
    ));
  };

  sortByCompleted = (by: string) => {
    switch (by) {
      case 'all':
        this.setState(state => ({ todos: state.todos }));
        break;
      case 'active':
        this.setState(state => (
          { todos: state.todos.filter((todo: Todo) => !todo.completed) }
        ));
        break;

      default:
        this.setState(state => (
          { todos: state.todos.filter((todo: Todo) => todo.completed) }
        ));
    }
  };

  randomize = () => {
    this.loader();
    this.setState(state => ({ todos: state.todos.sort(() => 0.5 - Math.random()) }));
  };

  render() {
    const { selectedUserId, todos } = this.state;
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
