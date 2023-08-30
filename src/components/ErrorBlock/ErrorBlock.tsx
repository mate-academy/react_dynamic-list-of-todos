const emptyTextLabel = '';

interface Props {
  loadData: () => void;
  errorMessage: string;
}

export const ErrorBlock: React.FC<Props> = ({ loadData, errorMessage }) => {
  return (
    <div className="notification is-danger">
      <button
        type="button"
        className="delete"
        onClick={loadData}
      >
        {emptyTextLabel}
      </button>
      {errorMessage}
    </div>
  );
};
