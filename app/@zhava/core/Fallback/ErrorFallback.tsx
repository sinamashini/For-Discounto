import { ErrorFallbackProps } from 'blitz';
import { FC } from 'react';
import AppMessageView from '../AppMessageView';


const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => <AppMessageView variant='error' message={error.message} />;

export default ErrorFallback;
