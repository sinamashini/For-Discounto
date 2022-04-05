import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import Layout from "app/core/layouts/Layout";
import Account from "app/users/page/Account";
import { BlitzPage } from "blitz";

const MyAccountPage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <Account />
  </AppLayout>
}

MyAccountPage.authenticate = { redirectTo: '/signin' };
MyAccountPage.getLayout = (page) => <Layout title="مشخصات کاربری">{page}</Layout>

export default MyAccountPage

