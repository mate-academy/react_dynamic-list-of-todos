import React from 'react';
import './TodoList.scss';

import cn from 'classnames';
import {
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { getTodosFromServer } from '../../api';

type Props = {
  selectUserHandler: (userId: string) => void,
  selectedUserId: number,
};

type State = {
  todos: Todo[],
  inputValue: string,
  selectValue: string,
  loading: boolean,
  errorMessage: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    inputValue: '',
    selectValue: 'all',
    loading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async (completed?: boolean) => {
    this.setState({
      loading: true,
    });

    try {
      const todosFromServer = await getTodosFromServer(completed);

      this.setState({
        todos: [...todosFromServer],
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Oops... Server is not responding',
      });
    } finally {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 500);
    }
  };

  changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  };

  changeSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.filterBySelect(value);

    this.setState({
      selectValue: value,
    });
  };

  filterBySelect = async (selectValue: string) => {
    this.setState({
      loading: true,
    });

    switch (selectValue) {
      case 'completed':
        this.getTodos(true);
        break;

      case 'not completed':
        this.getTodos(false);
        break;

      default:
        this.getTodos();
        break;
    }
  };

  getTodosFilteredByInput = () => {
    const { inputValue, todos } = this.state;

    if (inputValue.length) {
      return todos
        .filter(todo => todo.title.toLowerCase().includes(inputValue.toLowerCase()));
    }

    return todos;
  };

  shuffle = (todos: Todo[]) => {
    const randomizedTodos = todos;

    for (let i = randomizedTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [randomizedTodos[i], randomizedTodos[j]] = [randomizedTodos[j], randomizedTodos[i]];
    }

    return randomizedTodos;
  };

  randomize = () => {
    this.setState(prevState => ({
      todos: this.shuffle(prevState.todos),
    }));
  };

  render() {
    const {
      inputValue,
      selectValue,
      loading,
      errorMessage,
    } = this.state;

    const preparedTodos = this.getTodosFilteredByInput();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <InputGroup className="mb-3">
            <div className="TodoList__control-panel">
              <div className="TodoList__input">
                <FormControl
                  value={inputValue}
                  onChange={this.changeInputValue}
                  placeholder="Search by title"
                />
              </div>
              <div className="TodoList__select">
                <Form.Select
                  value={selectValue}
                  onChange={this.changeSelectValue}
                >
                  <option value="all">All</option>
                  <option value="not completed">Active</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </div>
              <button
                className="button TodoList__button"
                type="button"
                onClick={this.randomize}
              >
                Randomize
              </button>
            </div>
          </InputGroup>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {errorMessage.length ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : (
              <div className="TodoList__list-container">
                <ul className="TodoList__list">
                  {preparedTodos.length !== 0
                    && preparedTodos.map(todo => (
                      <li
                        className={cn(
                          'TodoList__item',
                          {
                            'TodoList__item--checked': todo.completed,
                            'TodoList__item--unchecked': !todo.completed,
                          },
                        )}
                        key={todo.id}
                      >
                        <label htmlFor={todo.id}>
                          <input
                            id={todo.id}
                            type="checkbox"
                            checked={todo.completed}
                            readOnly
                          />
                          <p>{todo.title}</p>
                        </label>

                        <button
                          className={cn(
                            'TodoList__user-button button',
                            { 'TodoList__user-button--selected': +todo.userId === this.props.selectedUserId },
                          )}
                          type="button"
                          value={todo.userId}
                          onClick={() => this.props.selectUserHandler(todo.userId)}
                        >
                          {`User #${todo.userId}`}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
