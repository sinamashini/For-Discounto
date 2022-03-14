import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import AddPackage from "app/packages/pages/AddPackage";
import { BlitzPage } from "blitz";

const AddPackagePage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <AddPackage />
  </AppLayout>
}

AddPackagePage.authenticate = { redirectTo: '/signin' };

export default AddPackagePage

