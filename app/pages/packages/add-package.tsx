import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { makeHeader } from "@zhava/utility/helper/Utils";
import AddPackage from "app/packages/pages/AddPackage";
import { BlitzPage, Head } from "blitz";

const AddPackagePage: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <Head>
      <title> {makeHeader("اضافه کردن پکیج ")} </title>
    </Head>
    <AddPackage />
  </AppLayout>
}

AddPackagePage.authenticate = { redirectTo: '/signin' };

export default AddPackagePage

