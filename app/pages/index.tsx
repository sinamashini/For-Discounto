import React from 'react';

import { BlitzPage } from 'blitz';

const Index: BlitzPage = () => <></>
export default Index

Index.authenticate = { redirectTo: '/signin' };
Index.redirectAuthenticatedTo = "/clients/all"
