import { FiUsers } from 'react-icons/fi';
import { FaUsersCog } from 'react-icons/fa';

import { ReactNode } from 'react';
import { RoutePermittedRole } from '../shared/constants/AppConst';


export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  as?: string;
}

export interface RouterConfigDataRole {
  User: RouterConfigData[],
  Admin: RouterConfigData[],
}

const routesConfig: RouterConfigDataRole = {
  User: [
    {
      id: 'app',
      title: 'Application',
      messageId: 'sidebar.application',
      type: 'group',
      children: [
        {
          id: 'crypto',
          title: 'Crypto',
          messageId: 'sidebar.app.dashboard.client',
          type: 'item',
          icon: <FiUsers />,
          url: '/clients/all',
        },
      ],
    },
  ],
  Admin: [
    {
      id: 'app',
      title: 'Application',
      messageId: 'sidebar.application',
      type: 'group',
      children: [
        {
          id: 'crypto',
          title: 'Crypto',
          messageId: 'sidebar.app.dashboard.client',
          type: 'item',
          icon: <FiUsers />,
          url: '/clients/all',
        },
        {
          id: 'crypto',
          title: 'Crypto',
          messageId: 'مدیریت کارکنان',
          type: 'item',
          icon: <FaUsersCog />,
          url: '/users/all',
        },
      ],
    },
  ]
};

export default routesConfig;
