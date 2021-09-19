
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

type StatusProps = {
    isLoading?: boolean;
    error?: string;
    success?: string;
}

const Status = (props: StatusProps) => {
  const { isLoading, error, success } = props;
  return (
    <>
      { isLoading && <LoadingSpinner asOverlay /> }
      { error && <h5 style={{ color: 'red' }}>{error}</h5> }
      { success && <h5 style={{ color: 'blue' }}>{success}</h5> }
    </>
  );
};

export default Status;
