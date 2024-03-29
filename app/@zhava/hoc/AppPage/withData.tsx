import React, {useEffect} from 'react';
import {useRouter} from 'blitz';
import AppLoader from '../../core/AppLoader';
import {useAuthUser} from '../../utility/AuthHooks';

const withData = (ComposedComponent) => (props) => {
  const {user, isLoading} = useAuthUser();
  const {asPath, push: routerPush} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !isLoading) {
      routerPush('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading]);
  if (!user || isLoading) return <AppLoader />;

  return <ComposedComponent {...props} />;
};
export default withData;
