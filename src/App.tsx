import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { API } from './utils/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  user: User;
}

type Props = {};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    user: {
      id: 0,
      email: '',
      phone: '',
      name: '',
    },
  };

  componentDidMount() {
    API.getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.selectedUserId !== this.state.selectedUserId && this.state.selectedUserId !== 0) {
      this.loadUser();
      // eslint-disable-next-line no-console
      console.log('updated');
    }
  }

  setSelectedId = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  loadUser() {
    const { selectedUserId } = this.state;

    API.getUserInfo(selectedUserId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { selectedUserId, todos, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} setSelectedId={this.setSelectedId} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                user={user}
                clear={this.setSelectedId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
