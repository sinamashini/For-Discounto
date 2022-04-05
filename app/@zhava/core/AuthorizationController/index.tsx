import { useSession } from 'blitz';
import { FC } from 'react';
import { Role } from 'types';
import { keys } from 'lodash';

interface ControllerProps {
  showChildrenTo: Role[];
  componentAndRole?: Record<Role, JSX.Element>;
}

const AuthorizationController: FC<ControllerProps> = ({ showChildrenTo, componentAndRole, children }) => {
  const session = useSession();
  const { role } = session;
  const isUserRoleVerfied = showChildrenTo.some(item => item === role);

  return (<>
    {(isUserRoleVerfied === true) ? <>{children}</> : null}
    {componentAndRole && keys(componentAndRole).map(key => <>{componentAndRole[key]}</>)}
  </>
  )
}

export default AuthorizationController;
