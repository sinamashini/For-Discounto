import { Box } from "@mui/material";
import AppsContainer from "@zhava/core/AppsContainer";
import EditPassword from "../components/EditPassword";
import EditAccount from "../components/EditAccount";
import { Head } from "blitz";
import { makeHeader } from "@zhava/utility/helper/Utils";

const Account = () => {
  return <>
    <Head>
      <title> {makeHeader("مشخصات کاربری")} </title>
    </Head>
    <AppsContainer
      title={'مشخصات کاربری'}
      fullView={true}
      sxStyle={{ mb: 10 }}
    >
      <EditAccount />
    </AppsContainer>
    <AppsContainer
      title={'تعویض رمز عبور'}
      fullView={true}
    >
      <Box sx={{ width: '100%', padding: 5 }}>
        <EditPassword />
      </Box>
    </AppsContainer>
  </>
}

export default Account;
