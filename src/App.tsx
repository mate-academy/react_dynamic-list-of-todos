import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types/Todo';

type State = {
  selectedUserId: number;
  todos: Todo[],
  visibleTodo: Todo[] | null,
  searchValue: string,
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    visibleTodo: null,
    searchValue: '',
  };

  componentDidMount() {
    getTodos().then(result => this.setState({
      todos: result,
      visibleTodo: result,
    }));
  }

  selectUser = (userId: number) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({ selectedUserId: userId });
    }
  };

  filterTodo = (value: boolean | string) => {
    this.setState(state => ({
      searchValue: '',
      visibleTodo: state.todos.filter(todo => todo.completed !== value),
    }));
  };

  render() {
    const {
      selectedUserId,
      visibleTodo,
      searchValue,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          {visibleTodo && (
            <>
              <div className="todos__nav">
                <input
                  type="text"
                  className="search__todo"
                  placeholder="search"
                  value={searchValue}
                  onChange={(event) => {
                    this.setState(state => ({
                      searchValue: event.target.value,
                      visibleTodo: state.todos
                        .filter(todo => todo.title.toLowerCase()
                          .includes(event.target.value.toLowerCase())),
                    }));
                  }}
                />
                <div className="todos__filter">
                  Show:
                  <button
                    type="button"
                    onClick={() => {
                      this.filterTodo('');
                    }}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.filterTodo(true);
                    }}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.filterTodo(false);
                    }}
                  >
                    Completed
                  </button>
                </div>
              </div>
              <TodoList
                todos={visibleTodo}
                selectUser={this.selectUser}
                selectedUserId={selectedUserId}
              />
            </>
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} selectUser={this.selectUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
