import React from 'react';
import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { BlitzPage } from 'blitz';

const HomePage: BlitzPage = () => {
    const { navStyle } = useLayoutContext();
    const AppLayout = Layouts[navStyle];
    return <AppLayout>null</AppLayout>
}

HomePage.redirectAuthenticatedTo = { pathname: 'clients/all' }
HomePage.authenticate = { redirectTo: '/signin' };

export default HomePage

