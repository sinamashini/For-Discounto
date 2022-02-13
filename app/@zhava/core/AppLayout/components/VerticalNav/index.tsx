import React from "react";
import List from "@mui/material/List";

import routesConfig, {
  RouterConfigData,
} from "../../../../../modules/routesConfig";
import NavVerticalGroup from "./VerticalNavGroup";
import VerticalCollapse from "./VerticalCollapse";
import VerticalItem from "./VerticalItem";
import { useSession } from "blitz";

const VerticalNav = () => {
  const user = useSession()
  if (!user?.role) return <></>;

  return (
    <List
      sx={{
        position: "relative",
        padding: 0,
      }}
      component="div"
    >
      {routesConfig[user?.role!].map((item: RouterConfigData) => (
        <React.Fragment key={item.id}>
          {item.type === "group" && <NavVerticalGroup item={item} level={0} />}

          {item.type === "collapse" && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === "item" && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default VerticalNav;
