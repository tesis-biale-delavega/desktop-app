import React from "react";
import { Box, Drawer, Stack, Toolbar, Link } from "@mui/material";

const SideBar = ({ children, onGoBackClick }) => {
  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Stack justifyContent="space-between" height={"100%"}>
        {children}
        <Box mt={"auto"} mb={2} ml={2}>
          <Link
            component={"button"}
            underline={"none"}
            color={"#fff"}
            onClick={onGoBackClick}
          >
            Go Back
          </Link>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default SideBar;
