import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';
//

interface State {
  todos: Todo[] | [],
  selectedUserId: number | null;
  search: Todo[] | [],
  status: boolean | null,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: null,
    search: [],
    status: null,
  };

  componentDidMount() {
    getAllTodos()
      .then((todos:Todo[]) => {
        this.setState({ todos, search: todos });
      });
  }

  showUser = (id:number) => {
    this.setState({ selectedUserId: id });
  };

  clearUser = () => {
    this.setState({ selectedUserId: null });
  };

  search = (value:string) => {
    if (this.state.status !== null) {
      this.setState(prevState => (
        {
          search: prevState.todos.filter(item => (
            item.title.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
            && item.completed === prevState.status
          )),
        }
      ));
    } else {
      this.setState(prevState => (
        {
          search: prevState.todos.filter(item => (
            item.title.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
          )),
        }
      ));
    }
  };

  todoStatus = (status: string) => {
    if (status === 'Done') {
      this.setState(prevState => (
        { search: prevState.todos.filter(item => item.completed), status: true }
      ));
    }

    if (status === 'Todo') {
      this.setState(prevState => (
        { search: prevState.todos.filter(item => !item.completed), status: false }
      ));
    }

    if (status === 'All') {
      this.setState(prevState => (
        { search: prevState.todos, status: null }
      ));
    }
  };

  render() {
    const { selectedUserId, search } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            onChange={(event) => {
              this.search(event?.target.value);
            }}
          />
          <select
            name="all"
            onChange={(event) => {
              this.todoStatus(event.target.value);
            }}
          >
            <option
              defaultValue="all"
            >
              All
            </option>
            <option
              defaultValue="true"
            >
              Done

            </option>
            <option
              defaultValue="false"
            >
              Todo
            </option>
          </select>

          <TodoList
            todo={search}
            selectedUserId={selectedUserId}
            showUser={(id:number) => {
              this.showUser(id);
            }}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
