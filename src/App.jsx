import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    query: '',
    criterion: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        const todosFromServer = todos.data.filter(todo => todo.userId !== null);

        this.setState({
          todos: todosFromServer,
          filteredTodos: todosFromServer,
        });
      });
  }

  setSelectedUser = (id) => {
    this.setState({ selectedUserId: id });
  };

  setDafaultUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  setQuery = (str) => {
    this.setState({
      query: str,
    });
    this.setState(state => ({
      filteredTodos: state.todos.filter(todo => todo.title.includes(str)),
    }));
  }

  setCriterion = (criter, IDsOfSelected) => {
    this.setState({
      criterion: criter,
    });
    if (criter === 'all') {
      this.setState(state => ({
        filteredTodos: [...state.todos],
      }));
    } else if (criter === 'active') {
      this.setState(state => ({
        filteredTodos: state.todos.filter(
          todo => !IDsOfSelected.includes(todo.id),
        ),
      }));
    } else {
      this.setState(state => ({
        filteredTodos: state.todos.filter(
          todo => IDsOfSelected.includes(todo.id),
        ),
      }));
    }
  }

  render() {
    const { filteredTodos, selectedUserId, query, criterion } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            setCriterion={this.setCriterion}
            criterion={criterion}
            query={query}
            setQuery={this.setQuery}
            todos={filteredTodos}
            setUser={this.setSelectedUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                defUser={this.setDafaultUser}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
