import { Todo } from '../../../../types/Todo';

interface Props {
  todo: Todo | null;
  onClose: () => void;
}

export const ModalHead: React.FC<Props> = ({ todo, onClose }) => (
  <header className="modal-card-head">
    <div
      className="modal-card-title has-text-weight-medium"
      data-cy="modal-header"
    >
      {`Todo #${todo?.id}`}
    </div>
    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      type="button"
      className="delete"
      data-cy="modal-close"
      onClick={onClose}
    />
  </header>
);
