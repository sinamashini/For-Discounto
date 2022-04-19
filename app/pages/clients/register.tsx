import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import Layout from "app/core/layouts/Layout";
import Account from "app/users/page/Account";
import { BlitzPage } from "blitz";

const RegisterPage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <Account />
  </AppLayout>
}

RegisterPage.authenticate = { redirectTo: '/signin' };
RegisterPage.getLayout = (page) => <Layout title="ثبت نام مراجع">{page}</Layout>

export default RegisterPage

