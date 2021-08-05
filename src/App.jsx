import React from 'react';
import './App.scss';
import './styles/general.scss';
import Loader from "react-loader-spinner";
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './utils';


class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then(todos => this.setState({ todos }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { selectUser, clearUser } = this;

    return (
      <>
        <div className="App">
          <div className="App__sidebar">
           {todos.length!==0
           ? <TodoList
              todos={todos}
              selectUser={selectUser}
              selectedUserId={selectedUserId}
            />
            :<Loader type="Oval" color="#00BFFF" height={80} width={80} />}
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId
                ? (
                  <CurrentUser
                    userId={selectedUserId}
                    clearUser={clearUser}
                  />)
                : 'No user selected'}
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default App;
