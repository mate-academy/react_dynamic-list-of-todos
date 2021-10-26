import React from 'react';

import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import getData from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  filterBy: string,
  whichShow: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filterBy: '',
    whichShow: 'all',
  };

  componentDidMount() {
    getData('/todos')
      .then(todos => {
        this.setState({
          todos,
        });
      });
  }

  componentDidUpdate() {
    getData('/todos')
      .then(todos => {
        const filteredByInput = todos
          .filter((todo: Todo) => todo.title.includes(this.state.filterBy));

        let filteredBySelect = [];

        switch (this.state.whichShow) {
          case 'active':
            filteredBySelect = filteredByInput
              .filter((todo: Todo) => todo.completed === false);
            break;

          case 'completed':
            filteredBySelect = filteredByInput
              .filter((todo: Todo) => todo.completed === true);
            break;

          default:
            filteredBySelect = [...filteredByInput];
            break;
        }

        this.setState({
          todos: filteredBySelect,
        });
      });
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectUser={(id) => {
              this.setState({ selectedUserId: id });
            }}
            filterByTitle={(value) => {
              this.setState({ filterBy: value });
            }}
            showOnly={(value) => {
              if (value !== this.state.whichShow) {
                this.setState({ whichShow: value });
              }
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={(zero) => {
                  this.setState({ selectedUserId: zero });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
