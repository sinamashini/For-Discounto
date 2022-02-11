import React from 'react';
import AppPage from '@zhava/hoc/AppPage';
import asyncComponent from '@zhava/utility/asyncComponent';

const Discount = asyncComponent(() => import('../../modules/clients'));

const ClientId = AppPage(() => <Discount />);

export default ClientId;
