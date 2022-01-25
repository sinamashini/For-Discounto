import React from 'react';
import AppPage from '@zhava/hoc/AppPage';
import asyncComponent from '@zhava/utility/asyncComponent';

const Status = asyncComponent(() => import('../../modules/clients'));

const PageStatus =  AppPage(() => <Status />);

export default PageStatus;
