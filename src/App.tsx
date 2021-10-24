import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  query: string,
  status: string,
}

class App extends React.Component<{}, State> {
  state = {
    selectedUserId: 0,
    todos: [],
    query: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selecteUserId = (id: number) => {
    this.setState({ selectedUserId: id });
  };

  changedQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      query: value,
    });
  };

  selectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: event.target.value });
  };

  render() {
    const {
      selectedUserId,
      todos,
      query,
      status,
    } = this.state;
    let visibleTodos: Todo[] = todos.filter((todo: Todo) => {
      const search: string = query.toLowerCase();

      return todo.title.toLowerCase().includes(search);
    });

    switch (status) {
      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            selectUser={this.selecteUserId}
            changeQuery={this.changedQuery}
            selectStatus={this.selectStatus}
            query={query}
            status={status}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                callback={this.selecteUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
