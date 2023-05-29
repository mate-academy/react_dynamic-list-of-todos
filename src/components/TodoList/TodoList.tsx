import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  showModal: (todo: Todo) => void,
  handleHide: (id: number) => void,
  selectedModal: number,
}

export const TodoList: React.FC<Props> = ({
  todos,
  showModal,
  handleHide,
  selectedModal,
}) => {
  const todoElements = todos.map(todo => {
    const { id, title, completed } = todo;

    return (
      <tr
        data-cy="todo"
        className=""
        key={id}
      >
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered">
          {completed
            && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
        </td>
        <td className="is-vcentered is-expanded">
          <p className={completed ? 'has-text-success' : 'has-text-danger'}>
            {title}
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => {
              showModal(todo);
              handleHide(id);
            }}
          >
            <span className="icon">
              <i className={`far ${selectedModal === id ? 'fa-eye-slash' : 'fa-eye'}`} />
            </span>
          </button>
        </td>
      </tr>
    );
  });

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
        {todoElements}
      </tbody>
    </table>
  );
};
