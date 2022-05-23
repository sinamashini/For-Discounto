import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import Users from '../../users/page'
import { makeHeader } from "@zhava/utility/helper/Utils";
import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";

const UserRoles: BlitzPage = () => {
    const { navStyle } = useLayoutContext();
    const AppLayout = Layouts[navStyle];

    return <AppLayout>
        <Users />
    </AppLayout>
}

UserRoles.getLayout = (page) => <Layout title={makeHeader("مدیریت کارکنان")}>sss</Layout>

UserRoles.suppressFirstRenderFlicker = true;

UserRoles.authenticate = { redirectTo: '/signin' };


export default UserRoles;


