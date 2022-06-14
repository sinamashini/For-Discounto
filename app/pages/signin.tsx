import Signin from "../modules/auth/Signin/index"
import React from 'react';
import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { BlitzPage } from 'blitz';

const SigninPage: BlitzPage = () => {
    // const { navStyle } = useLayoutContext();
    // const AppLayout = Layouts[navStyle];
    return <Signin />
}

SigninPage.redirectAuthenticatedTo = { pathname: 'clients/all' }

export default SigninPage

