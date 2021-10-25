import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './components/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  query: string;
  filterValue: string | null;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    query: '',
    filterValue: 'all',
  };

  componentDidMount() {
    getData('/todos')
      .then(todos => {
        this.setState({ todos });
      });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  removeUserCelection = () => {
    this.setState({ selectedUserId: 0 });
  };

  serchInTitles = (query: string) => {
    this.setState({ query });
  };

  setFilter = (filterValue: string) => {
    this.setState({ filterValue });
  };

  render() {
    const {
      todos,
      selectedUserId,
      query,
    } = this.state;

    const callbackFilterFn = (todo: Todo) => {
      switch (this.state.filterValue) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed === true;
        case 'active':
          return todo.completed === false;
        default:
          return todo;
      }
    };

    const preparedTodos = todos
      .filter(callbackFilterFn)
      .filter(todo => (todo.title.toLowerCase().includes(query.toLowerCase())));

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            serchInTitles={this.serchInTitles}
            setFilter={this.setFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                removeUserCelection={this.removeUserCelection}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
