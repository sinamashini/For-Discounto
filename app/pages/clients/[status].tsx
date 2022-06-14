import Contact from '../../clients/Page';
import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { BlitzPage } from "blitz";

const ClientStatus: BlitzPage = () => {
    const { navStyle } = useLayoutContext();
    const AppLayout = Layouts[navStyle];

    return <AppLayout>
        <Contact />
    </AppLayout>
}

ClientStatus.authenticate = { redirectTo: '/signin' };

export default ClientStatus
