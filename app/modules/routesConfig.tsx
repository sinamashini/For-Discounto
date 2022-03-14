import { FiUsers } from 'react-icons/fi';
import { FaUsersCog, FaBox, FaBoxes } from 'react-icons/fa';
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
  USER: RouterConfigData[],
  ADMIN: RouterConfigData[],
}

const routesConfig: RouterConfigDataRole = {
  USER: [
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
  ADMIN: [
    {
      id: 'app',
      title: 'Application',
      messageId: 'sidebar.application',
      type: 'group',
      children: [
        {
          id: 'sss',
          title: 'aaa',
          messageId: 'sidebar.app.dashboard.client',
          type: 'item',
          icon: <FiUsers />,
          url: '/clients/all',
        },
        {
          id: 'employees',
          title: 'Employees',
          messageId: 'مدیریت کارکنان',
          type: 'item',
          icon: <FaUsersCog />,
          url: '/users/all',
        }
      ]
    },
    {
      id: 'packages',
      title: 'Packages',
      messageId: 'پکیج ها',
      type: 'group',
      children: [
        {
          id: 'packages',
          title: 'Packages',
          messageId: 'مدیریت پکیج ها',
          type: 'item',
          icon: <FaBoxes />,
          url: '/packages/management',
        },
        {
          id: 'add-packages',
          title: 'AddPackages',
          messageId: 'اضافه کردن پکیج',
          type: 'item',
          icon: <FaBox />,
          url: '/packages/add-package',
        },
      ]
    },
  ]
};

export default routesConfig;
