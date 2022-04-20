import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { makeHeader } from "@zhava/utility/helper/Utils";
import EditPackage from "app/packages/pages/EditPackage";
import { BlitzPage, Head } from "blitz";

const EditPackagePage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <Head>
      <title> {makeHeader("ویرایش پکیج")} </title>
    </Head>
    <EditPackage />
  </AppLayout>
}

EditPackagePage.authenticate = { redirectTo: '/signin' };

export default EditPackagePage

