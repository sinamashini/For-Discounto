import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import EditPackage from "app/packages/pages/EditPackage";
import { BlitzPage } from "blitz";

const EditPackagePage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <EditPackage />
  </AppLayout>
}

EditPackagePage.authenticate = { redirectTo: '/signin' };

export default EditPackagePage

