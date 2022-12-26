import React from "react";
import { Box, Drawer, Stack, Toolbar, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { processingStates } from "../utils/processingStates";

const SideBar = ({ children, onGoBackClick, onGoForwardClick }) => {
  const analysis = useSelector((state) => state.analysis);
  const { stitchingData, generatedIndexes } = useSelector(
    (state) => state.analysis
  );
  const processingState = useSelector(
    (state) => state.analysis.processingState
  );

  console.log(analysis);

  const canGoBack = () => {
    switch (processingState) {
      case processingStates.INDEX_GENERATOR:
        return (
          stitchingData?.orthophoto_path === undefined ||
          stitchingData?.orthophoto_path === null
        );
      default:
        return true;
    }
  };

  const canGoForward = () => {
    switch (processingState) {
      case processingStates.PRE_STITCHING:
        return (
          stitchingData?.orthophoto_path !== undefined &&
          stitchingData?.orthophoto_path !== null
        );
      case processingStates.INDEX_GENERATOR:
        return (
          generatedIndexes?.length > 0 ||
          (stitchingData?.orthophoto_path !== undefined &&
            stitchingData?.orthophoto_path !== null)
        );
      default:
        return true;
    }
  };

  const showGoForward = () => {
    switch (processingState) {
      case processingStates.CUSTOM_INDEX_CREATION:
      case processingStates.INDEX_VISUALIZATION_HEATMAP:
      case processingStates.IMAGE_COMPARISON_SLIDER:
        return false;
      default:
        return true;
    }
  };

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Stack justifyContent="space-between" height={"100%"}>
        {children}
        <Stack direction={"row"} mt={2}>
          <Box mt={"auto"} mb={2} ml={2}>
            <Link
              component={"button"}
              underline={"none"}
              color={"#fff"}
              onClick={onGoBackClick}
              disabled={!canGoBack()}
              sx={{
                cursor: !canGoBack() ? "not-allowed" : "pointer",
              }}
            >
              <Typography
                variant={"body2"}
                color={!canGoBack() ? "#ababab" : "#fff"}
              >
                Ir atras
              </Typography>
            </Link>
          </Box>
          {showGoForward() && (
            <Box mt={"auto"} mb={2} ml={"auto"} mr={2}>
              <Link
                component={"button"}
                underline={"none"}
                color={"#fff"}
                onClick={onGoForwardClick}
                disabled={!canGoForward()}
                sx={{
                  cursor: !canGoForward() ? "not-allowed" : "pointer",
                }}
              >
                <Typography
                  variant={"body2"}
                  color={!canGoForward() ? "#ababab" : "#fff"}
                >
                  Ir adelante
                </Typography>
              </Link>
            </Box>
          )}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default SideBar;
