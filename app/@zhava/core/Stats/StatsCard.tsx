import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { AppCard } from "@zhava/index";
import { Fonts } from "shared/constants/AppEnums";

interface Props {
  icon: string;
  bgColor?: string;
  value: string | JSX.Element;
  heading: any;
  variant?: "outlined" | "contained"
}

const StatsCard: React.FC<Props> = ({
  icon,
  bgColor,
  value,
  heading,
  variant = "contained"
}) => {
  return (
    <AppCard
      sxStyle={{
        borderRadius: 4,
        ...(bgColor && variant === "outlined" && { border: `1px dotted ${bgColor}` }),
        ...(bgColor && variant === "contained" && { backgroundColor: bgColor })
      }}
      className="card-hover"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img alt="" src={icon} />
        <Box
          sx={{
            position: "relative",
            ml: 4,
          }}
        >
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
              mb: 2,
            }}
          >
            {heading}
          </Box>
          <Box
            component="h3"
            sx={{
              display: "inline-block",
              fontWeight: Fonts.MEDIUM,
              fontFamily: "IRANYekan(FaNum)",
              fontSize: 17,
              mr: 3,
              color: '#000000'
            }}
          >
            {value}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default StatsCard;

