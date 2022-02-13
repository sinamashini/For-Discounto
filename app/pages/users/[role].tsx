import AppPage from "@zhava/hoc/AppPage";
import asyncComponent from "@zhava/utility/asyncComponent";
import { BlitzPage } from "blitz"

const Users: BlitzPage = asyncComponent(() => import('../../users/page'));

const UserRoles = AppPage(() => <Users />);

export default UserRoles;
