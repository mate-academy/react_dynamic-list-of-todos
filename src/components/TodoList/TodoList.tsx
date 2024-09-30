import { Todo } from '../../types/Todo';

export interface TodoListProps {
  selected: number;
  onSelected: (id: number) => void;
  toDoList: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({
  selected,
  onSelected,
  toDoList,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {toDoList.map(toDo => (
          <tr
            key={toDo.id}
            data-cy="todo"
            className={toDo.id === selected ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{toDo.id}</td>
            <td className="is-vcentered">
              {toDo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={
                  toDo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {toDo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelected(toDo.id)}
              >
                <span className="icon">
                  {toDo.id === selected ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
