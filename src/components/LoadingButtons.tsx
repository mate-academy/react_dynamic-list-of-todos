import React, { FC } from 'react';
import Button from '@material-ui/core/Button';

type LoadingProps = {
  onLoading: () => void;
  loading: boolean;
  gotError: boolean;
  errorMessage: string;
};

export const LoadingButtons: FC<LoadingProps> = (props) => {
  const {
    onLoading,
    loading,
    gotError,
    errorMessage,
  } = props;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={onLoading}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load'}
      </Button>
      {gotError === true
        && (
          <p>
            {errorMessage}
            {' '}
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={onLoading}
            >
              Retry Loading
            </Button>
          </p>
        )}
    </>
  );
};
