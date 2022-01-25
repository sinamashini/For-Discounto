import asyncComponent from "@zhava/utility/asyncComponent";
import { BlitzPage } from "blitz"

const SignIn: BlitzPage = asyncComponent(() => import('../modules/auth/Signin/index'));

SignIn.redirectAuthenticatedTo = "/"
export default SignIn;
