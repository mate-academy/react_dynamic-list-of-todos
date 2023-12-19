import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered" />
      {completed
      && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
      <td className="is-vcentered is-expanded">
        <p className={
          completed ? 'has-text-success'
            : 'has-text-danger'
        }
        >
          { title }
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
