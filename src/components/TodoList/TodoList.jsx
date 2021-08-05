import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './TodoList.scss';
import { Todo } from '../Todo/Todo';
import { Form } from '../Form/Form';
import { getTodos } from '../../api';

export class TodoList extends React.Component {
  state = {
    query: '',
    todos: [],
    staticTodos: [],
    todoStatus: '',
  }

  componentDidMount() {
    getTodos()
      .then(response => (
        this.setState({
          todos: response.data,
          staticTodos: response.data,
        })
      ));
  }

  setQuery = (value) => {
    this.setState({
      query: value,
    });
  }

  setTodoStatus = ({ target }) => {
    this.setState({
      todoStatus: target.value,
    });

    this.sortTodo(target.value);
  }

  sortTodo = (value) => {
    let filteredTodos;

    switch (value) {
      case 'completed':
        filteredTodos = this.state.staticTodos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = this.state.staticTodos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = this.state.staticTodos;
    }

    this.setState({
      todos: filteredTodos,
    });
  };

  render() {
    const {
      chooseUser,
      selectedUserId,
    } = this.props;

    const { setQuery, setTodoStatus } = this;
    const { query, todos, todoStatus } = this.state;

    const filteredTodos = todos
      .filter(
        todo => todo.title
          && todo.title.includes(query),
      );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Form
          query={query}
          setQuery={setQuery}
          todoStatus={todoStatus}
          setTodoStatus={setTodoStatus}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classnames(
                    'TodoList__item',
                    {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    },
                  )}
                >
                  <Todo
                    {...todo}
                    selectedUserId={selectedUserId}
                    chooseUser={chooseUser}
                  />
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  chooseUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
