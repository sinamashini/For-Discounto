import AppsContainer from "@zhava/core/AppsContainer";
import { makeHeader } from "@zhava/utility/helper/Utils";
import { Head } from "blitz";
import UsersList from "../components/UserList";
import UserSidebar from "../components/UserSidebar";

const User = () => {
    return <AppsContainer
        title={"مدیریت کارکنان"}
        fullView={false}
        sidebarContent={<UserSidebar />}
    >
        <UsersList />
    </AppsContainer>
}

export default User;
