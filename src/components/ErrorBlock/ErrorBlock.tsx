import './ErrorBlock.scss';

interface Props {
  error: string;
  setError: (error: string) => void;
  updateTimestamp: (timestamp: Date) => void;
}

export const ErrorBlock: React.FC<Props> = ({
  error,
  setError,
  updateTimestamp,
}) => {
  function reload() {
    updateTimestamp(new Date());
    setError('');
  }

  return (
    <div className="error-block has-background-danger-light p-3">
      <p className="has-text-danger">{error}</p>
      <button className="button small-button p-1" onClick={reload}>
        Reload
      </button>
    </div>
  );
};
