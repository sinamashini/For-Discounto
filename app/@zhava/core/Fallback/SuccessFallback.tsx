import { FC } from 'react';
import AppMessageView from '../AppMessageView';

interface MessageProps {
  message: string;
}

const SuccessFallback: FC<MessageProps> = ({ message }) => <AppMessageView variant='success' message={message} />;

export default SuccessFallback;
