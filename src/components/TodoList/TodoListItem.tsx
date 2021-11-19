import classNames from 'classnames';

type Props = {
  todo: Todo;
  setSelectedId: (userId: number) => void;
};

export const TodoListItem: React.FC<Props> = ({ todo, setSelectedId }) => {
  return (
    <li
      key={todo.id}
      className={classNames('TodoList__item', {
        'TodoList__item--unchecked': !todo.completed,
        'TodoList__item--checked': todo.completed,
      })}
    >
      <label htmlFor={`completed_${todo.id}`}>
        <input
          id={`completed_${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
        <p>{todo.title}</p>
      </label>

      <button
        className={classNames(
          'TodoList__user-button',
          'button',
          { 'TodoList__user-button--selected': true },
        )}
        type="button"
        onClick={() => setSelectedId(todo.userId)}
      >
        User&nbsp;
        {todo.userId}
      </button>
    </li>
  );
};
