import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import PackagesPage from "app/packages/pages/PackagesPage";
import { BlitzPage } from "blitz";

const Management: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <PackagesPage />
  </AppLayout>
}

Management.authenticate = { redirectTo: '/signin' };

export default Management

