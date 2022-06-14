import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import AppMessageView from '@zhava/core/AppMessageView';
import AppLoader from '@zhava/core/AppLoader';
import { AppState } from '../../../redux/store';
import { AuthenticationError, AuthorizationError, ErrorBoundary, ErrorComponent, ErrorFallbackProps, useQueryErrorResetBoundary } from 'blitz';
import LoginForm from 'app/auth/components/LoginForm';


const showError = (error: string) => {
    return <AppMessageView variant='error' message={error} />;
};

const AppInfoView = () => {
    const { error, loading, message } = useSelector<AppState, AppState['common']>(
        ({ common }) => common,
    );

    const showMessage = () => {
        return <AppMessageView variant='success' message={message.toString()} />;
    };


    return (<>
        {error && showError(error)}
        {loading && <AppLoader />}

        {message && showMessage()}
    </>
    );
};

export default AppInfoView;

// function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps, customError?: string) {
//   if (error instanceof AuthenticationError) {
//     return <LoginForm onSuccess={resetErrorBoundary} />
//   } else if (error instanceof AuthorizationError) {
//     return (
//       <ErrorComponent
//         statusCode={error.statusCode}
//         title="شما به این قسمت دسترسی ندارید"
//       />
//     )
//   } else {
//     if (customError) {
//       return (
//         showError(customError)
//       )
//     }
//     return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
//   }
// }
