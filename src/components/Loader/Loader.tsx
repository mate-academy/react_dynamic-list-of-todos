import { FC } from 'react';
import './Loader.scss';

interface IProps {
  loading: boolean;
}

export const Loader: FC<IProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="Loader" data-cy="loader">
          <div className="Loader__content" />
        </div>
      )}
    </>
  );
};
