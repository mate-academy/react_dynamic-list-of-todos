import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
} from 'react';
import './TodoList.scss';
import { TodoItem } from '../TodoItem/TodoItem';

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  todos: Todo[];
  selectedUserId: number | null,
  selectNewUser: (x: number) => void;
  onShuffleChange: () => void;
};

export const TodoList: FC<Props> = ({
  todos,
  selectedUserId,
  selectNewUser,
  onShuffleChange,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [status, setStatus] = useState(Status.All);

  const changeShuffle = () => {
    onShuffleChange();
  };

  const filterTodosByStatus = () => {
    switch (status) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.All:
      default:
        return todos;
    }
  };

  const filteredTodosByTitle = filterTodosByStatus().filter(todo => {
    const title = todo.title.toLowerCase();
    const query = filterQuery.toLowerCase();

    return title.includes(query);
  });

  const visibleTodos = filteredTodosByTitle;

  const changeStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  }, []);

  const changeFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__buttons">
        <label className="TodoList__label">
          Filter
          <input
            data-cy="filterByTitle"
            className="TodoList__input"
            type="text"
            value={filterQuery}
            onChange={changeFilter}
          />
        </label>

        <label className="TodoList__label">
          Select
          <select
            className="TodoList__input"
            value={status}
            onChange={changeStatus}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </label>

        <div className="TodoList__label">
          Random order
          <button
            type="button"
            className="TodoList__input"
            onClick={changeShuffle}
          >
            Shuffle list
          </button>
        </div>
      </div>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectNewUser={selectNewUser}
              selectedUserId={selectedUserId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
