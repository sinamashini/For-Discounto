import React from 'react';
import AppPage from '@zhava/hoc/DefaultPage/index'
import asyncComponent from "@zhava/utility/asyncComponent";

const SignIn = asyncComponent(() => import('../modules/auth/Signin/index'));
export default AppPage(() => <SignIn/>);
