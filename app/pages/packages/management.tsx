import Layouts from "@zhava/core/AppLayout/Layouts";
import { useLayoutContext } from "@zhava/utility/AppContextProvider/LayoutContextProvider";
import { makeHeader } from "@zhava/utility/helper/Utils";
import PackagesPage from "app/packages/pages/PackagesPage";
import { BlitzPage, Head } from "blitz";

const Management: BlitzPage = () => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  return <AppLayout>
    <Head>
      <title> {makeHeader("مدیریت پکیج ها")} </title>
    </Head>
    <PackagesPage />
  </AppLayout>
}

Management.authenticate = { redirectTo: '/signin' };

export default Management

