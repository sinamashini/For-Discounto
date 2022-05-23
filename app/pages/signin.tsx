import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import SigninPage from '../modules/auth/Signin/index'

const SignIn: BlitzPage = () => <SigninPage />

SignIn.redirectAuthenticatedTo = "/"
SignIn.getLayout = (page) => <Layout title="ورود">{page}</Layout>

export default SignIn;

