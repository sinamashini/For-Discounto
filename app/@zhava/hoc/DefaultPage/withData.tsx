import React, {useEffect} from 'react';
import {useRouter, Router} from 'blitz';
import {initialUrl} from '../../../shared/constants/AppConst';
import AppLoader from '../../core/AppLoader';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';

const withData = (ComposedComponent) => (props) => {
  const {user, isLoading} = useCurrentUser()
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (user) {
      Router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [user]);
  if (isLoading) return <AppLoader />;
  if (user) return <AppLoader />;

  return <ComposedComponent {...props} />;
};

export default withData;
