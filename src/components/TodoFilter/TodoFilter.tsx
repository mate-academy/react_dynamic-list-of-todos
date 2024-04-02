import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface PropsFilter {
  todosInitial: Todo[];
  todosToRender(filteredTodos: Todo[]): void;
}

export const TodoFilter: React.FC<PropsFilter> = ({
  todosInitial,
  todosToRender,
}) => {
  const [initialComplete, setInitialComplete] = useState(todosInitial);
  const [initialCompleteOriginal, setInitialCompleteOriginale] =
    useState(todosInitial);

  const [initialInput, setInitialInput] = useState(todosInitial);
  const [initialInputOriginal, setInitialInputOriginale] =
    useState(todosInitial);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInitialComplete(todosInitial);
    setInitialInput(todosInitial);
    setInitialCompleteOriginale(todosInitial);
    setInitialInputOriginale(todosInitial);
  }, [todosInitial]);

  useEffect(() => {
    todosToRender(initialComplete);
  }, [initialComplete, todosToRender]);

  useEffect(() => {
    todosToRender(initialInput);
  }, [initialInput, todosToRender]);

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      setInitialComplete(initialInputOriginal);
      setInitialCompleteOriginale(todosInitial);
    }

    if (event.target.value === 'active') {
      setInitialComplete(
        initialInputOriginal.filter(todo => todo.completed === false),
      );
      setInitialCompleteOriginale(
        todosInitial.filter(todo => todo.completed === false),
      );
    }

    if (event.target.value === 'completed') {
      setInitialComplete(
        initialInputOriginal.filter(todo => todo.completed === true),
      );
      setInitialCompleteOriginale(
        todosInitial.filter(todo => todo.completed === true),
      );
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredBySearch = initialCompleteOriginal.filter(todo =>
      todo.title.toLowerCase().includes(event.target.value.toLowerCase()),
    );

    const filteredBySearchOriginal = todosInitial.filter(todo =>
      todo.title.toLowerCase().includes(event.target.value.toLowerCase()),
    );

    setInitialInput(filteredBySearch);
    setInitialInputOriginale(filteredBySearchOriginal);
    setInputValue(event.target.value);
  };

  const handleDeleteInput = () => {
    setInputValue('');
    todosToRender(todosInitial);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={filter} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          onChange={handleSearch}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue !== '' && (
            <button
              onClick={handleDeleteInput}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
