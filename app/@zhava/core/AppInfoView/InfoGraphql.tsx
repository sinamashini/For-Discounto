import React, { FC } from 'react';
import AppMessageView from '@zhava/core/AppMessageView';
import AppLoader from '@zhava/core/AppLoader';

interface Props {
  error?: string;
  loading?: boolean;
  message?: string
}

const InfoViewGraphql:FC<Props> = ({error, loading, message, children}) => {

  const showMessage = () => {
    return <AppMessageView variant='success' message={message?.toString()!} />;
  };

  const showError = () => {
    return <AppMessageView variant='error' message={error?.toString()!} />;
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && message !== '' && showMessage()}
      {error && showError()}
      {!loading && <>{
        children}
      </>
      }
    </>
  );
};

export default InfoViewGraphql;
