import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../Api/api';
import { Todo } from '../../types/Todo';

type State = {
  todosList: Todo[],
  completed: string,
  listFilter: Todo[],
  searchTodo: string,
  random: boolean
};

type Props = {
  selectUser: (num: number) => void
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todosList: [],
    listFilter: [],
    completed: 'all',
    searchTodo: '',
    random: false,
  };

  componentDidMount() {
    getTodos()
      .then(res => {
        this.setState({ todosList: res });
        this.setState({ listFilter: res });
      });
  }

  randomizer = (arr: Todo[]) => {
    const result = arr;

    for (let i = arr.length - 1; i > 0; i -= 1) {
      const numRandom = Math.floor(Math.random() * (i + 1));

      [result[i], result[numRandom]] = [result[numRandom], result[i]];
    }

    return result;
  };

  getOnCompleted = () => {
    this.setState({ random: false });
    this.setState((prev) => {
      return {
        listFilter: prev.todosList.filter((el: Todo) => {
          switch (prev.completed) {
            case 'active':
              return el.completed === false;
            case 'completed':
              return el.completed;
            default:
              return true;
          }
        }),
      };
    });
  };

  onSearch = (arr: Todo[]) => {
    const result = arr.filter(el => {
      return el.title.includes(this.state.searchTodo);
    });

    return result;
  };

  render() {
    const {
      completed, listFilter, searchTodo, random,
    } = this.state;
    const { selectUser } = this.props;
    const arrForRender = (random)
      ? this.randomizer(this.onSearch(listFilter))
      : this.onSearch(listFilter);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <select
          name="todosSelect"
          value={completed}
          onChange={(e) => {
            if (completed !== e.target.value) {
              this.setState({
                completed: e.target.value,
              });
              this.getOnCompleted();
            }
          }}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <input
          type="text"
          value={searchTodo}
          onChange={(e) => {
            this.setState({ searchTodo: e.target.value });
          }}
        />
        <button
          type="button"
          onClick={() => {
            this.setState({ random: true });
          }}
        >
          Randomize
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {arrForRender.map((el: Todo) => (
              <li
                className="TodoList__item TodoList__item--unchecked"
                key={el.id}
              >
                <label htmlFor={`${el.id}`}>
                  <input
                    type="checkbox"
                    readOnly
                    checked={el.completed}
                    id={`${el.id}`}
                    onChange={() => {
                      this.setState((prev) => {
                        return {
                          todosList: prev.todosList.map((item) => {
                            const newTodoStatus = (item.id === el.id)
                              ? { ...item, completed: !item.completed }
                              : item;

                            return newTodoStatus;
                          }),
                        };
                      });
                      this.getOnCompleted();
                    }}
                  />
                  <p>{el.title}</p>
                </label>
                <button
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                  type="button"
                  onClick={() => {
                    selectUser(el.userId);
                  }}
                >
                  {`User #${el.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
