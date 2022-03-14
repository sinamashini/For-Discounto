import AppsContainer from "@zhava/core/AppsContainer";
import PackagesList from "../components/PackagesList";


const PackagesPage = () => {

  return <AppsContainer
    title={"مدیریت پکیج ها"}
    fullView={true}
  >
    <PackagesList />
  </AppsContainer>
}

export default PackagesPage;
